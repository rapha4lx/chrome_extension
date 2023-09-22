


const replaceImage = () => {
    const images = document.querySelectorAll('.selectable_overlay');

    images.forEach((image) => console.log(image.href));
}

document.getElementById("btn").addEventListener("click", async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceImage
    });

});