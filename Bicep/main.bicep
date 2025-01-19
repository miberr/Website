var appInsightsName = 'appi-website-prod'
var logWorkspaceName = 'log-website-prod'
var staticWebsiteName = 'swa-website-prod'
var zoneName = 'mikkoberg.com'


resource appinsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: resourceGroup().location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logWorkspace.id
  }
}

resource logWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: logWorkspaceName
  location: resourceGroup().location
  properties: {
    retentionInDays: 30
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource staticWebsite 'Microsoft.Web/staticSites@2024-04-01' = {
  name: staticWebsiteName
  location: resourceGroup().location
  sku: {
    name: 'Free'
  }
  properties: {
    allowConfigFileUpdates: true
    enterpriseGradeCdnStatus: 'Disabled'
    stagingEnvironmentPolicy: 'Disabled'
    buildProperties: {
      appLocation: '/Website'
      apiLocation: ''
      appArtifactLocation: 'build'
    }
  }
}

resource staticWebsiteDomain 'Microsoft.Web/staticSites/customDomains@2024-04-01' = {
  parent: staticWebsite
  name: 'mikkoberg.com'
  properties: {
    validationMethod: 'dns-txt-token'
  }
}

resource comZone 'Microsoft.Network/dnsZones@2023-07-01-preview' = {
  name: zoneName
  location: resourceGroup().location
}

resource comZoneARecord 'Microsoft.Network/dnsZones/A@2023-07-01-preview' = {
  parent: comZone
  name: '@'
  properties: {
    TTL: 86400
    targetResource: {
      id: staticWebsite.id
    }
  }
}

output appInsightsConnectionString string = appinsights.properties.ConnectionString
