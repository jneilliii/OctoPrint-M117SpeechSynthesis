# OctoPrint-M117SpeechSynthesis

OctoPrint plugin to speak aloud M117 gcode messages when the web ui is loaded.

**Note: this plugin does NOT work with files on the SD card. Requires modern day browsers that support Speech Synthesis, check compatibility table [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance#Browser_compatibility).**

![screenshot](settings.png)


### Setup

Install via the bundled Plugin Manager or manually using this URL:

https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/archive/master.zip

## Changelog

### [0.5.1] - 2019-10-03
- Added Python 3 compatibility.

### [0.5.0] - 2018-03-18
- Added option for using custom GCODE commands.  When enabled in settings processing of regular M117 messages will stop working. Use the command @SPEAK as replacement to M117.

### [0.4.0] - 2018-02-23
- Fixed binding related issues that required saving the settings prior to using the test button.  Now works without saving first.

### [0.3.0] - 2018-01-22
- UI tweaks and additional browser checks.

### [0.2.0] - 2018-01-20
- Added language code option in settings.

### [0.1.0] - 2018-01-17
- Initial release.

## Get Help

If you experience issues with this plugin or need assistance please use the issue tracker by clicking issues above.

### Additional Plugins

Check out my other plugins [here](https://plugins.octoprint.org/by_author/#jneilliii)

### Sponsors
- Andreas Lindermayr
- [@Mearman](https://github.com/Mearman)
- [@TxBillbr](https://github.com/TxBillbr)
- Gerald Dachs
- [@TheTuxKeeper](https://github.com/thetuxkeeper)
- @tideline3d
- [SimplyPrint](https://simplyprint.dk/)
- [Andrew Beeman](https://github.com/Kiendeleo)

### Support My Efforts
I, jneilliii, programmed this plugin for fun and do my best effort to support those that have issues with it, please return the favor and leave me a tip or become a Patron if you find this plugin helpful and want me to continue future development.

[![Patreon](patreon-with-text-new.png)](https://www.patreon.com/jneilliii) [![paypal](paypal-with-text.png)](https://paypal.me/jneilliii)

<small>No paypal.me? Send funds via PayPal to jneilliii&#64;gmail&#46;com</small>

[0.5.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.5.0
[0.4.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.4.0
[0.3.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.3.0
[0.2.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.2.0
[0.1.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.1.0

