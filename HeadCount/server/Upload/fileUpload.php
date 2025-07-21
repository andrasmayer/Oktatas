<?php



if( !isset($_FILES["file"] ) ){
    echo "A feltöltésben nincs file";
}
else{
    $file = $_FILES['file'];
    $maxFileSize = intval(ini_get("upload_max_filesize")) *1024*1024;
    $currentFileSize = $file["size"];




    if($maxFileSize < $currentFileSize){
        echo "File mérete nagyobb a megengedett $maxFileSize Mb-nál";
    }
    else{
        $extension = explode(".",$file["name"]);
        $ext = "." . $extension[count($extension)-1];
        $fileName = uniqid() . $ext;
        move_uploaded_file($file['tmp_name'], __DIR__ . "/Files/$fileName"  );

        $_POST["procedure"] = "crm_file_uploads";
        $_POST["mode"] = "fetchColumnAll";
        $_POST["parameters"] = "'$_POST[pid]','$_POST[sid]','$fileName','$_POST[user]','$_POST[lid]','$file[name]'";

        //var_dump($file);

        include("../Procedures/Fetch.php");

    }
}
    