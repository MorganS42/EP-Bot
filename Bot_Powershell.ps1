Sleep 3 #wait so you can select the input box
$n=0; #saving what file to look at
$file=”Your_File”+"\"; #change this to your download folder or wherever your browser downloads to. You may want to create a new file and set it as where your browser downloads to just for this program.

while(1) { #runs forever
    $t = New-Object -ComObject wscript.shell; #setting up the typing
    $an; #answer
    $f=$file+$n+".txt"; #looking for that file
    while(-not (Test-Path -Path $f)) { #waiting for it to download
    }
    $n++; #updates the file
    $an=Get-Content -Path $f #gets the text from that file
    
    $an = $an.Replace("%","{%}")
    $an = $an.Replace("(","{(}")
    $an = $an.Replace(")","{)}") #updates it for powershell to read

    $t.SendKeys($an) #types it in

    $t.SendKeys('~') #presses enter
}
