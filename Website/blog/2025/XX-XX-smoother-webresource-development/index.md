---
authors: mikko
draft: true
description: DESCRIPTION
hide_table_of_contents: false
image: "./hero.png"
keywords:
  [
    power platform,
    power apps,
    javascript,
    model-driven app,
    model-driven,
    client-side scripting,
    development,
  ]
slug: slug
title: Title
tags: [powerApps, powerPlatform, clientSideScripting, javaScript, workflow]
---

Development of client side scripting can be painfull. As discussed in my [previous blog post](../02-12-must-know-javascript-in-model-driven-apps/index.md) it is very easy to get started, but the flow of coding ➡️ uploading ➡️ publishing ➡️ refresing is time consuming and annoying.

Microsoft describes [how to use Fiddler](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/streamline-javascript-development-fiddler-autoresponder) to help with this issue. As a Mac user, issue is that Fiddler Classic is not available for MacOS. [Fiddler Ewerywhere](https://www.telerik.com/fiddler/fiddler-everywhere) is, but it's not free. We can do development without any additional installations - browser developer tools 🌟. Let's next discuss on how to streamline your development flow with them!

<!-- truncate -->

## Browser developer tools

Browser developer tools are a set of built-in utilities in modern web browsers that help developers inspect and debug web pages. They provide features like HTML and CSS inspection, JavaScript debugging, network activity monitoring, and performance analysis, making it easier to develop and troubleshoot web applications.

very modern browser has developer tools build in. They might be called a bit differently, but the functionality is generally the same. They are an essential tool in your Power Platform toolbox. I'll use Microsoft Edge in the examples, but Google Chrome works pretty much the same. Here we'll dive into JavaScript debugging.

## Let's code 🕵️

:::note Prerequisites

- Model-Driven Power App
- JavaScript web resource
- Registered event handlers

:::

### Grab the name of the web resource

I'm going to use my previous example about Client Scripting. To start, you need to find the logical name of your web resource you want to continue to develop.

1. Go to your solution with the app and web resource.
1. Open the edit panel of the web resource.
1. Copy the **Name** property.
   ![Web resource name](./web-resource-name.png)

### Override the resource in Developer tools

:::info

I'm, using Microsoft Edge, but Google Chrome and others work very similarly.

:::

To enable us to continuosly develop and test our code, we need to override the web resource in the browser.

1. Play your model-driven Power App.
   ![Play model-driven app](./open-application.png)
1. Navigate tho the form where you use JavaScript.
1. Press **F12** on your keybord. Developer tools open next to the webpage.
1. Select **Sources**
   ![Select sources in developer tools](./developer-tools-source.png)
1. Press **Ctrl + P** and search with the **Name** of your web resource and press enter. You should now have your script file open in Developer tools.
   ![File open in developer tools](./web-resource-in-dev-tools.png)
1. Right click on the file tab and select **Override content**.
   ![Override content](./override-content.png)
1. Developer tools will prompt you to select a folder to store override files in. Select **Select folder** and choose a location. I'll select Desktop.
1. The browser requests access to that location, select **Allow**.
   ![File is now overriden](./file-overriden.png)

Your file is now overriden. This means that instead of fetching the web resource from Dataverse, the browser injects it from your local machine. The app itself works just as before, but now we are able to modify the code without complicated updates.

:::info

Keep the developer tools open, otherwise the override will stop working.

:::

### Write some code

You can start modifying your JavaScript directly from developer tools, or you can use your preferred code editor. I'll use Visual Studio Code.

Open the file from your desktop. You can find it inside one of the folders. The developer tools creates similar file system structure as in the web page, so this is why there are subfolders.

My code here automatically updates the duration field when the start and end fields are modified. You can find a detailed discription of it [here](../02-12-must-know-javascript-in-model-driven-apps/index.md#calculate-column-value-in-real-time).

For now I'll update the code to log a message into the console so we can check out it works.

1. Update the function.
    ```js
    calculateDuration: function (executionContext) {
    "use strict";
        var formContext = executionContext.getFormContext();
        var startTime = formContext.getAttribute("mb_start").getValue();
        var endTime = formContext.getAttribute("mb_end").getValue();

        console.log(startTime)
        if (startTime && endTime) {
            var duration = (endTime - startTime) / (1000 * 60);
            formContext.getAttribute("mb_duration").setValue(duration);

            // highlight-start
            // Log something on the console when values change
            console.log("Values changed!");
            // highlight-end
        }
    },
    ```
1. Save the file.
1. Select **Console** back in developer tools.
    ![Select Console](./select-console.png)
1. Press **Ctrl + L** on your keyboard to clear the console.
1. Trigger your code. In my case I'll change the start time, which will run the code.
    ![Console message visible](./console-log-message.png)

Notice, that we did not update the Power App tab at any point. The modified script will be called as if it is uploaded to your solution. Pretty cool. Just for the sake of it, I'll add some code to show validation message below the duration, when the value is over 8 hours.

