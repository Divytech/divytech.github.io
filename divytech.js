 document.addEventListener('DOMContentLoaded', function() {
    var videoPlayer = document.getElementById('videoPlayer');
    var pipButton = document.getElementById('pipButton');
    var qualitySelector = document.getElementById('qualitySelector');

var videoSources = {
  '240p': 'https://prod-ent-live-gm.jiocinema.com/hls/live/2100323/hd_akamai_androidmob_avc_hin_ipl_s1_m1070424/master_240p.m3u8',
  '360p': 'https://prod-ent-live-gm.jiocinema.com/hls/live/2100323/hd_akamai_androidmob_avc_hin_ipl_s1_m1070424/master_360p.m3u8',
  '480p': 'https://prod-ent-live-gm.jiocinema.com/hls/live/2100323/hd_akamai_androidmob_avc_hin_ipl_s1_m1070424/master_480p.m3u8',
  '720p': 'https://prod-ent-live-gm.jiocinema.com/hls/live/2100323/hd_akamai_androidmob_avc_hin_ipl_s1_m1070424/master_720p.m3u8',
  '1080p': 'https://prod-ent-live-gm.jiocinema.com/hls/live/2100323/hd_akamai_androidmob_avc_hin_ipl_s1_m1070424/master_1080p.m3u8',
  '4k': 'https://prod-ent-live-gm.jiocinema.com/hls/live/2100322/uhd_akamai_ctv_avc_hin_ipl_s1_m1070424/master.m3u8'
};


    // Function to change video source based on selected quality
    function changeVideoQuality(quality) {
      var currentTime = videoPlayer.currentTime;
      var isPlaying = !videoPlayer.paused;
      videoPlayer.src = videoSources[quality];
      videoPlayer.load();
      videoPlayer.currentTime = currentTime;
      if (isPlaying) {
        videoPlayer.play();
      }
    }

    // Function to change video source based on network speed
    function autoChangeVideoQuality() {
      var networkSpeed = navigator.connection.downlink; // Get the network speed in Mbps
      var selectedQuality;

      if (networkSpeed > 25) {
        selectedQuality = '4k';
      } else if (networkSpeed > 10) {
        selectedQuality = '1080p';
      } else if (networkSpeed > 5) {
        selectedQuality = '720p';
      } else if (networkSpeed > 2) {
        selectedQuality = '480p';
      } else if (networkSpeed > 1) {
        selectedQuality = '360p';
      } else {
        selectedQuality = '240p';
      }

      changeVideoQuality(selectedQuality);
      qualitySelector.value = selectedQuality;
    }

    // Event listener for quality selection
    qualitySelector.addEventListener('change', function() {
      changeVideoQuality(this.value);
    });

    // Listen for changes in the network
    navigator.connection.addEventListener('change', autoChangeVideoQuality);

    // Set initial video source based on network speed
    autoChangeVideoQuality();

    // Picture-in-Picture Button Event
    pipButton.addEventListener('click', function() {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        if (videoPlayer.requestPictureInPicture) {
          videoPlayer.requestPictureInPicture();
        }
      }
    });
  });
