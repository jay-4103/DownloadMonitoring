// chrome.downloads.onCreated.addListener(function (e) {
// 	console.log(e);
// });

// chrome.downloads.onChanged.addListener(function (e) {
// 	if (typeof e.state !== 'undefined') {
// 		if (e.state.current === 'complete') {
// 			console.log('Download ID ' + e.id + ' has completed');
// 		}
// 	}
// 	console.log(e);	

// 	// Extract relevant information from downloadItem
// 	const downloadData = {
// 		id: e.id,
// 		url: e.url,
// 		filename: e.filename,
// 		// Add any other relevant properties
// 	};

// 	// Make a POST request to your local API
// 	fetch('http://127.0.0.1:9000/reading', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(downloadData),
// 	})
// 		.then(response => {
// 			if (!response.ok) {
// 				throw new Error('Network response was not ok');
// 			}
// 			return response.status;
// 		})
// 		.then(data => {
// 			console.log('Data sent to local API:', data);
// 			// You can handle the response from the API here
// 		})
// 		.catch(error => {
// 			console.error('Error sending data to local API:', error);
// 		});
// });

chrome.downloads.onChanged.addListener(function (e) {
	if (typeof e.state !== 'undefined') {
		if (e.state.current === 'complete') {
			console.log('Download ID ' + e.id + ' has completed');
			chrome.downloads.search({ id: e.id }, function (downloadItems) {
				if (downloadItems.length > 0) {
					const downloadItem = downloadItems[0];
					console.log('Download details:', downloadItem);

					//if (downloadItem.url.startsWith("https://ieeexplore.ieee.org/stampPDF/")) {
						console.log("Condition passed for storing the file in database");
						// Extract relevant information from the downloadItem
						var x = downloadItem.id;
						var y = downloadItem.url;
						const urlObject = new URL(y);
						// Extract the "arnumber" parameter
						const arnumber1 = urlObject.searchParams.get('arnumber');

						var filePath = downloadItem.filename;
						const pathSegments = filePath.split('/'); // Split on "/" for Unix-like systems
						// For Windows, you can also split using backslash:
						// const pathSegments = filePath.split('\\');
						// Extract the last segment, which represents the file name
						const fileNameWithExtension = pathSegments[pathSegments.length - 1];
						// If you want to extract only the file name without the extension, you can split again using "."
						let fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
						fileNameWithoutExtension = fileNameWithoutExtension.replace(/\s*\(\d+\)$/, '');

						//to send data to upload api
						const downloadData = {
							id: downloadItem.id,
							arnumber: arnumber1,
							filename: fileNameWithoutExtension,
							// Add any other relevant properties
						};

						const downloadUrl = downloadItem.url; // URL of the downloaded file
						// Fetch the downloaded file data
						fetch(downloadUrl)
							.then(response => response.blob())
							.then(blob => {
								// Create FormData object and append the downloaded file
								const formData = new FormData();
								formData.append('paper', blob, downloadItem.filename);
								// console.log(formData);
								formData.append('fileNameWithoutExtension', fileNameWithoutExtension);
								formData.append('arnumber1', arnumber1);

								// Make a POST request to your API
								fetch('http://127.0.0.1:9000/reading', {
									method: 'POST',
									body: formData,
								})
									.then(response => {
										if (!response.ok) {
											throw new Error('Network response was not ok');
										}
										return response.status;
									})
									.then(data => {
										console.log('File sent to API:', data);
										// Handle the response from the API
									})
									.catch(error => {
										console.error('Error sending file to API:', error);
									});
							})
							.catch(error => {
								console.error('Error fetching file:', error);
							});
					//}
				} else {
					console.log('No download found with ID:', DOWNLOAD_ID);
				}
			});
		}
	}
});
