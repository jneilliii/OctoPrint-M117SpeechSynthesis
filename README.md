# OctoPrint-M117SpeechSynthesis

OctoPrint plugin to speak aloud M117 gcode messages when the web ui is loaded.

**Note: this plugin does NOT work with files on the SD card. Requires modern day browsers that support Speech Synthesis, check compatibility table [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance#Browser_compatibility).**

![screenshot](settings.png)


### Setup

Install via the bundled Plugin Manager or manually using this URL:

https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/archive/master.zip

## Changelog

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

[0.5.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.5.0
[0.4.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.4.0
[0.3.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.3.0
[0.2.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.2.0
[0.1.0]: https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/tree/0.1.0