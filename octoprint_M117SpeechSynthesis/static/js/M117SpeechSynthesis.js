$(function() {
    function M117SpeechSynthesisViewModel(parameters) {
        var self = this;
		
		self.settingsViewModel = parameters[0];
			
		self.enableSpeech = ko.observable();
		self.speechVoice = ko.observable();
		self.speechVolume = ko.observable();
		self.speechPitch = ko.observable();
		self.speechRate = ko.observable();
		self.speechLanguage = ko.observable();
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
					msg.lang = self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechLanguage();
					msg.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == self.speechVoice(); })[0];
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
			self.speechLanguage(self.settingsViewModel.settings.plugins.M117SpeechSynthesis.speechLanguage());
			if('speechSynthesis' in window) {
				self.speechEnabledBrowser(true);
				self.loadVoices();
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
		}
			
		self.onEventSettingsShown = function (payload) {
				self.loadVoices();
		}
			
		self.testVoice = function(data) {
			if(self.enableSpeech() && ('speechSynthesis' in window)){
				var msg = new SpeechSynthesisUtterance("M117 Speech Synthesis example.");
				msg.volume = data.speechVolume();
				msg.pitch = data.speechPitch();
				msg.rate = data.speechRate();
				msg.lang = data.speechLanguage();
				msg.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == data.speechVoice(); })[0];
				speechSynthesis.cancel();
				speechSynthesis.speak(msg);
			}
		}
		
		self.loadVoices = function() {
			if (self.voices().length > 0)
				return;
			var voicenames = speechSynthesis.getVoices();
			voicenames.forEach(function(voice, i) {
				self.voices.push({'name':voice.name,'value':voice.name})
				});
			}
				
		if ('speechSynthesis' in window) {
			speechSynthesis.onvoiceschanged = function(e) {
				self.loadVoices();
			};
		}
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
