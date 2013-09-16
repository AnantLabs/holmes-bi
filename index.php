<!DOCTYPE html>
<html>
    <head>
        <title>Holmes BI - PHP Business Intelligence Solution</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
        <link rel="stylesheet" type="text/css" href="css/styles.css" />
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link rel="stylesheet" type="text/css" href="css/dashboard.css" />
        <link rel="stylesheet" type="text/css" href="css/metadata.css" />
        
        <script src="js/jquery.min-2.0.3.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
        
        <script src="js/main_controller.js" type="text/javascript"></script>
        <script src="js/main_model.js" type="text/javascript"></script>
        <script src="js/main_view.js" type="text/javascript"></script>
        
        <script src="js/metadata_model.js" type="text/javascript"></script>
        <script src="js/metadata_controller.js" type="text/javascript"></script>
        <script src="js/metadata_view.js" type="text/javascript"></script>
        
        <script src="js/dashboard_model.js" type="text/javascript"></script>
        <script src="js/dashboard_controller.js" type="text/javascript"></script>
        <script src="js/dashboard_view.js" type="text/javascript"></script>
        
        <script type="text/javascript">
            var session_id = "<?php echo $_SESSION["user_session_id"];?>";
            var trans_value = "";
            var user_lang = "";
        </script>
    </head>
    <body>
        <div id="head">
            <div id="head_logo">
                <a href="http://holmesbi.alfenory.de"><img src="images/logo_small.png" border="0"/></a>
            </div>
            <div id="head_content">
                
            </div>
        </div>
        <div id="content">
            
        </div>
    </body>
</html>