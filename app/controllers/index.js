function doClick(e) {
	var intent = Titanium.Android.createIntent({
		action : 'android.media.action.IMAGE_CAPTURE',
	});
	Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
		if (e.error) {
			alert("error");
		} else {
			if (e.resultCode === Titanium.Android.RESULT_OK) {
				var imageView = Ti.UI.createImageView({
					top : 50,
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE,
					autorotate : false
				});
				$.index.add(imageView);
				var intentFile = Ti.Filesystem.getFile(e.intent.data);
				var copiedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'ab.jpeg');
				intentFile.copy(copiedFile.nativePath);
				var blob = copiedFile.read();
				imageView.image = blob;
			} else {
				alert("error");
			}
		}
	});
}

$.index.open();
