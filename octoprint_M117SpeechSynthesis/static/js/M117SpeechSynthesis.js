$(function() {
    function M117SpeechSynthesisViewModel(parameters) {
        var self = this;

		self.settingsViewModel = parameters[0];

		self.enableSpeech = ko.observable();
		self.speechVoice = ko.observable('');
		self.speechVolume = ko.observable();
		self.speechPitch = ko.observable();
		self.speechRate = ko.observable();
		self.speechLanguage = ko.observable();
		self.voices = ko.observableArray([]);
		self.speechEnabledBrowser = ko.observable();
		self.useCustomGCODE = ko.observable();

		self.onDataUpdaterPluginMessage = function(plugin, data) {
			if (plugin != "M117SpeechSynthesis") {
				return;
			}

			if(data.type == "speak") {
				if(self.enableSpeech() && ('speechSynthesis' in window) && (self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVoice() !== '')){
					self.speechSynthesis.text = data.msg;
					self.speechSynthesis.volume = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVolume();
					self.speechSynthesis.pitch = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechPitch();
					self.speechSynthesis.rate = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechRate();
					self.speechSynthesis.lang = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechLanguage();
					self.speechSynthesis.voice = self.speechSynthesisVoices[self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVoice()];
					speechSynthesis.cancel();
					speechSynthesis.speak(self.speechSynthesis);
				}
			}
		}

		self.onBeforeBinding = function() {
			if ('speechSynthesis' in window) {
				self.speechSynthesis = new SpeechSynthesisUtterance("M117 Speech Synthesis example.");
				self.speechSynthesisVoices = speechSynthesis.getVoices();
				// Hack around voices bug
				var interval = setInterval(function () {
					self.speechSynthesisVoices = speechSynthesis.getVoices();
					if (self.speechSynthesisVoices.length) clearInterval(interval); else return;

					for (var i = 0; i < self.speechSynthesisVoices.length; i++) {
						self.voices.push({'name':self.speechSynthesisVoices[i].name,'value':i});
					}
				}, 10);
			}
			self.enableSpeech(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.enableSpeech());
			self.speechVolume(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVolume());
			self.speechPitch(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechPitch());
			self.speechRate(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechRate());
			self.speechLanguage(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechLanguage());
			self.useCustomGCODE(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.useCustomGCODE());
			if('speechSynthesis' in window) {
				self.speechEnabledBrowser(true);
				// self.loadVoices();
			} else { 
				self.speechEnabledBrowser(false);
			}
		}

		self.onEventSettingsUpdated = function (payload) {
			self.enableSpeech(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.enableSpeech());
			self.speechVoice(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVoice());
			self.speechVolume(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVolume());
			self.speechPitch(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechPitch());
			self.speechRate(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechRate());
			self.speechLanguage(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechLanguage());
			self.useCustomGCODE(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.useCustomGCODE());
		}

		self.testVoice = function(data) {
			if(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.enableSpeech() && ('speechSynthesis' in window)){
				self.onDataUpdaterPluginMessage("M117SpeechSynthesis", {'msg':'M117 Speech Synthesis example.','type':'speak'});
			}
		} 

    }

    ADDITIONAL_VIEWMODELS.push([
        M117SpeechSynthesisViewModel,
        ["settingsViewModel"],
        ["#settings_plugin_M117SpeechSynthesis_form"]
    ]);
});
