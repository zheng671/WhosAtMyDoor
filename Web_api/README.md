# DoorApp
Final project for team 5 in the Mobile Application development.

To deploy the project on an EC2 instance run the following commands from local

scp -i <PemFile> -r <Source> ubuntu@<InstanceURL>:~/

ssh -i <PemFile> ubuntu@<InstanceURL> 'chmod +x ~/DoorApp/Script.sh'

ssh -i <PemFile> ubuntu@<InstanceURL> 'bash ~/DoorApp/Script.sh'


where PemFile is the personal secret key. Source is the source location and InstanceURL is the URL of the spawned instance.

PS:- It really takes a long time to copy the folder to the instance. I would suggest zip it, and copy the zip file instead of the 1st command. You would have to unzip it on the instance before running commands 2 and 3. 
