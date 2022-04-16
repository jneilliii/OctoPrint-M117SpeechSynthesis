# coding=utf-8

import octoprint.plugin
import re
import pyttsx3


class M117SpeechSynthesis(octoprint.plugin.AssetPlugin,
                          octoprint.plugin.TemplatePlugin,
                          octoprint.plugin.SettingsPlugin):

    def AlertM117(self, comm_instance, phase, cmd, cmd_type, gcode, *args, **kwargs):
        message = None
        if gcode and cmd.startswith("M117") and not self._settings.get(["useCustomGCODE"]):
            message = dict(type="speak", msg=re.sub(r'^M117\s?', '', cmd))

        if cmd.startswith("@SPEAK") and self._settings.get(["useCustomGCODE"]):
            message = dict(type="speak", msg=re.sub(r'^@SPEAK\s?', '', cmd))

        if message:
            if self._settings.get_boolean(["usePiSpeaker"]):
                engine = pyttsx3.init()
                engine.setProperty("volume", float(self._settings.get(["speechVolumeLocal"])))
                engine.setProperty("rate", float(self._settings.get(["speechRateLocal"])))
                engine.say(message["msg"])
                engine.runAndWait()
            else:
                self._plugin_manager.send_plugin_message(self._identifier, message)

    ##-- AssetPlugin hooks
    def get_assets(self):
        return dict(js=["js/M117SpeechSynthesis.js"])

    ##-- Settings hooks
    def get_settings_defaults(self):
        return dict(enableSpeech=False, speechVoice="", speechVolume=1, speechPitch=1, speechRate=1,
                    speechLanguage="en-US", useCustomGCODE=False, usePiSpeaker=False, speechVolumeLocal=0.75,
                    speechRateLocal=175)

    ##-- Template hooks
    def get_template_configs(self):
        return [dict(type="settings", custom_bindings=True)]

    ##~~ Softwareupdate hook
    def get_version(self):
        return self._plugin_version

    def get_update_information(self):
        return dict(
            m117popup=dict(
                displayName="M117 Speech Synthesis",
                displayVersion=self._plugin_version,

                # version check: github repository
                type="github_release",
                user="jneilliii",
                repo="OctoPrint-M117SpeechSynthesis",
                current=self._plugin_version,
                stable_branch=dict(
                    name="Stable", branch="master", comittish=["master"]
                ),
                prerelease_branches=[
                    dict(
                        name="Release Candidate",
                        branch="rc",
                        comittish=["rc", "master"],
                    )
                ],

                # update method: pip
                pip="https://github.com/jneilliii/OctoPrint-M117SpeechSynthesis/archive/{target_version}.zip"
            )
        )


__plugin_name__ = "M117 Speech Synthesis"
__plugin_pythoncompat__ = ">=2.7,<4"


def __plugin_load__():
    global __plugin_implementation__
    __plugin_implementation__ = M117SpeechSynthesis()

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.comm.protocol.gcode.queuing": __plugin_implementation__.AlertM117,
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
