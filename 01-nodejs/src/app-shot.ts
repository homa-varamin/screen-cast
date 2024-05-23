import screenshot from "screenshot-desktop";

export class AppShot {
  shot() {
    screenshot()
      .then((img: Buffer) => {
        console.log("Screenshot captured in memory. Length:", img.length);
      })
      .catch((err: any) => {
        console.error("Error taking screenshot:", err);
      });
  }

  shotFile() {
    screenshot({ screen: 0, filename: "screenshot.jpg" }) 
      .then((imgPath) => {
        console.log(`Screenshot saved to: ${imgPath}`);
      })
      .catch((err) => {
        console.error("Error taking screenshot:", err);
      });
  }
}
