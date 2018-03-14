class HomePage {
    public get webCam() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_0"); }
    public get takePictureButton() { return browser.element(".widget-camera-picture"); }
    public get image() { return browser.getAttribute("img", "src"); }
    public get imageElement() { return browser.element("#mxui_widget_ReactCustomWidgetWrapper_0 > img"); }

    public open(): void {
        browser.url("/p/Large");
    }
}

const HomePageA = new HomePage();

export default HomePageA;
