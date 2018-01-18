$(function() {
    function M117SpeechSynthesisViewModel(parameters) {
        var self = this;
		
		self.settingsViewModel = parameters[0];
		
		self.enableSpeech = ko.observable();
		self.speechVoice = ko.observable();
		self.speechVolume = ko.observable();
		self.speechPitch = ko.observable();
		self.speechRate = ko.observable();
		self.voices = ko.observableArray();
		self.speechEnabledBrowser = ko.observable();

		self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "M117SpeechSynthesis") {
                return;
            }
			
			if(data.type == "speak") {
				if(self.enableSpeech() && ('speechSynthesis' in window)){
					var msg = new SpeechSynthesisUtterance(data.msg);
					msg.volume = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVolume();
					msg.pitch = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechPitch();
					msg.rate = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechRate();
					msg.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVoice(); })[0];
					speechSynthesis.cancel();
					speechSynthesis.speak(msg);
				}
			}
		}
		
		self.onBeforeBinding = function() {
			self.enableSpeech(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.enableSpeech());
			self.speechVoice(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVoice());
			self.speechVolume(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVolume());
			self.speechPitch(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechPitch());
			self.speechRate(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechRate());
        }
		
		self.onEventSettingsUpdated = function (payload) {
			self.enableSpeech(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.enableSpeech());
			self.speechVoice(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVoice());
			self.speechVolume(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechVolume());
			self.speechPitch(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechPitch());
			self.speechRate(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechRate());
        }
		
		self.testVoice = function(data) {
			self.onDataUpdaterPluginMessage("M117SpeechSynthesis", {'msg':'M117 Speech Synthesis example.','type':'speak'});
		}
			
		speechSynthesis.onvoiceschanged = function(e) {
			if (self.voices().length > 0)
				return;
			var voicenames = speechSynthesis.getVoices();
			voicenames.forEach(function(voice, i) {
				self.voices.push({'name':voice.name,'value':voice.name})
				});
		};
    }

    // This is how our plugin registers itself with the application, by adding some configuration
    // information to the global variable OCTOPRINT_VIEWMODELS
    ADDITIONAL_VIEWMODELS.push([
        // This is the constructor to call for instantiating the plugin
        M117SpeechSynthesisViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ["settingsViewModel"],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        ["#settings_plugin_M117SpeechSynthesis_form"]
    ]);
});