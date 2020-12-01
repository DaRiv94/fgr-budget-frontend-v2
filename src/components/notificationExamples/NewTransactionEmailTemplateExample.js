import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
  registerBtn: {
      color: "#FFFFFF",
      '&:hover': {
          color: "#FFFFFF",
          textDecoration: "none"
      }
  },
  centerize: {
      justifyContent: "center"
  },
  gridmargin:{
    margin: 10
  },
  header: {
    textAlign: "center"
  },
});

//I used https://htmltojsx.in/ to convert my html template into JSX for this functional component
export default function NewTransactionEmailTemplateExample() {
  const classes = useStyles();
return  <>
<h1 className={classes.header} >Email Notification Example</h1>
<Grid className={classes.centerize} container spacing={2}>
<Grid className={classes.gridmargin} container item xs={12} spacing={2}>
    <Grid item sm={2} ></Grid>
    <Grid item xs={12} sm={4}>
        <Button className={classes.registerBtn}
            fullWidth
            color="primary"
            variant="contained"
            component={Link} to="/">
            Back
            </Button>
    </Grid>

    <Grid item xs={12} sm={4}>
        <Button className={classes.registerBtn}
            fullWidth
            color="primary"
            variant="contained"
            component={Link} to="/help">
            Help
            </Button>
    </Grid>
    <Grid item sm={2} component={Box} display={{ xs: "none", sm: "block" }}></Grid>
</Grid>


</Grid>
<div>
  <meta charSet="utf-8" /> {/* utf-8 works for most cases */}
  <meta name="viewport" content="width=device-width" /> {/* Forcing initial-scale shouldn't be necessary */}
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> {/* Use the latest (edge) version of IE rendering engine */}
  <meta name="x-apple-disable-message-reformatting" /> {/* Disable auto-scale in iOS 10 Mail entirely */}
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
  {/* Tell iOS not to automatically link certain text strings. */}
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title /> {/*   The title tag shows in email notifications, like Android 4.4. */}
  {/* What it does: Makes background images in 72ppi Outlook render at correct size. */}
  {/*[if gte mso 9]>
    <xml>
  <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
    </xml>
    <![endif]*/}
  {/* Web Font / @font-face : BEGIN */}
  {/* NOTE: If web fonts are not required, lines 23 - 41 can be safely removed. */}
  {/* Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. */}
  {/*[if mso]>
  <style>
      * {
          font-family: sans-serif !important;
      }
  </style>
    <![endif]*/}
  {/* All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ */}
  {/*[if !mso]><!*/}
  {/* insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> */}
  {/*<![endif]*/}
  {/* Web Font / @font-face : END */}
  {/* CSS Reset : BEGIN */}
  <style dangerouslySetInnerHTML={{__html: "\n        /* What it does: Tells the email client that only light styles are provided but the client can transform them to dark. A duplicate of meta color-scheme meta tag above. */\n        :root {\n            color-scheme: light;\n            supported-color-schemes: light;\n        }\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\n        body {\n            margin: 0 auto !important;\n            padding: 0 !important;\n            height: 100% !important;\n            width: 100% !important;\n        }\n\n        /* What it does: Stops email clients resizing small text. */\n        * {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* What it does: Centers email on Android 4.4 */\n        div[style*=\"margin: 16px 0\"] {\n            margin: 0 !important;\n        }\n\n        /* What it does: forces Samsung Android mail clients to use the entire viewport */\n        #MessageViewBody,\n        #MessageWebViewDiv {\n            width: 100% !important;\n        }\n\n        /* What it does: Stops Outlook from adding extra spacing to tables. */\n        table,\n        td {\n            mso-table-lspace: 0pt !important;\n            mso-table-rspace: 0pt !important;\n        }\n\n        /* What it does: Fixes webkit padding issue. */\n        table {\n            border-spacing: 0 !important;\n            border-collapse: collapse !important;\n            table-layout: fixed !important;\n            margin: 0 auto !important;\n        }\n\n        /* What it does: Uses a better rendering method when resizing images in IE. */\n        img {\n            -ms-interpolation-mode: bicubic;\n        }\n\n        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */\n        a {\n            text-decoration: none;\n        }\n\n        /* What it does: A work-around for email clients meddling in triggered links. */\n        a[x-apple-data-detectors],\n        /* iOS */\n        .unstyle-auto-detected-links a,\n        .aBn {\n            border-bottom: 0 !important;\n            cursor: default !important;\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */\n        .a6S {\n            display: none !important;\n            opacity: 0.01 !important;\n        }\n\n        /* What it does: Prevents Gmail from changing the text color in conversation threads. */\n        .im {\n            color: inherit !important;\n        }\n\n        /* If the above doesn't work, add a .g-img class to any image in question. */\n        img.g-img+div {\n            display: none !important;\n        }\n\n        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n        /* Create one of these media queries for each additional viewport size you'd like to fix */\n\n        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */\n        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {\n            u~div .email-container {\n                min-width: 320px !important;\n            }\n        }\n\n        /* iPhone 6, 6S, 7, 8, and X */\n        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {\n            u~div .email-container {\n                min-width: 375px !important;\n            }\n        }\n\n        /* iPhone 6+, 7+, and 8+ */\n        @media only screen and (min-device-width: 414px) {\n            u~div .email-container {\n                min-width: 414px !important;\n            }\n        }\n    " }} />
  {/* CSS Reset : END */}
  {/* Progressive Enhancements : BEGIN */}
  <style dangerouslySetInnerHTML={{__html: "\n        /* What it does: Hover styles for buttons */\n        .button-td,\n        .button-a {\n            transition: all 100ms ease-in;\n        }\n\n        .button-td-primary:hover,\n        .button-a-primary:hover {\n            background: #3f51b5 !important;\n            border-color: #3f51b5 !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 600px) {\n\n            /* What it does: Adjust typography on small screens to improve readability */\n            .email-container p {\n                font-size: 17px !important;\n            }\n\n        }\n\n        /*START------------------ New Styles here */\n\n        .new_tranaction_title {\n            text-align: center;\n            color: #FFFFFF\n        }\n\n        .non_top_transaction_block {\n            border-top: #3f51b5 solid 5px;\n        }\n\n\n\n\n\n        /*END--------------------- New Styles here */\n    " }} />
  {/* Progressive Enhancements : END */}
  {/*
	The email background color (#FFFFFF) is defined in three places:
	1. body tag: for most email clients
	2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
	3. mso conditional: For Windows 10 Mail
*/}
  <center role="article" aria-roledescription="email" lang="en" style={{"width":"100%","background-color":"#FFFFFF"}}>
    {/*[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF;">
    <tr>
    <td>
    <![endif]*/}
    {/* Visually Hidden Preheader Text : BEGIN */}
    <div style={{"max-height":"0","overflow":"hidden","mso-hide":"all"}} aria-hidden="true">
      You Have New transactions!
    </div>
    {/* Visually Hidden Preheader Text : END */}
    {/* Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. */}
    {/* Preview Text Spacing Hack : BEGIN */}
    <div style={{"display":"none","font-size":"1px","line-height":"1px","max-height":"0px","max-width":"0px","opacity":"0","overflow":"hidden","mso-hide":"all","font-family":"sans-serif"}}>
      ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
    </div>
    {/* Preview Text Spacing Hack : END */}
    {/*
      Set the email width. Defined in two places:
      1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
      2. MSO tags for Desktop Windows Outlook enforce a 600px width.
  */}
    <div style={{"max-width":"600px","margin":"0 auto"}} className="email-container">
      {/*[if mso]>
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
      <tr>
      <td>
      <![endif]*/}
      {/* Email Body : BEGIN */}
      <table align="center" role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%" style={{"margin":"auto"}}>
        {/* Clear Spacer : BEGIN */}
        <tbody><tr>
            <td aria-hidden="true" height={40} style={{"font-size":"0px","line-height":"0px"}}>
              &nbsp;
            </td>
          </tr>
          {/* Clear Spacer : END */}
          {/* 1 Column Text + Button : BEGIN */}
          <tr>
            <td style={{"background-color":"#E5E6E5"}}>
              <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
                <tbody><tr>
                    <td style={{"padding":"20px","font-family":"sans-serif","font-size":"15px","line-height":"20px","color":"#3f51b5"}}>
                      <h1 className="new_tranaction_title" style={{"margin":"0 0 10px 0","font-family":"sans-serif","font-size":"25px","line-height":"30px","color":"#3f51b5","font-weight":"bold"}}>
                        New Transactions Notification</h1>
                      <h3 style={{"margin":"0 0 10px 0","font-family":"sans-serif","font-size":"20px","line-height":"30px","color":"#3f51b5","font-weight":"normal"}}>
                        <span style={{"font-weight":"bold"}}>Bank:</span>&nbsp;Chase</h3>
                      <p style={{"margin":"0"}}>The following is a list of new transactions that have come
                        through on your accounts.</p>
                    </td>
                  </tr>
                </tbody></table>
            </td>
          </tr>
          {/* 1 Column Text + Button : END */}
          {/* Clear Spacer : BEGIN */}
          <tr>
            <td aria-hidden="true" height={40} style={{"font-size":"0px","line-height":"0px"}}>
              &nbsp;
            </td>
          </tr>
          {/* Clear Spacer : END */}
          {/* 1 Column Text + Button : BEGIN */}
          <tr>
            <td style={{"background-color":"#E5E6E5"}}>
              <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
                <tbody><tr>
                    <td style={{"padding":"20px","font-family":"sans-serif","font-size":"15px","line-height":"20px","color":"#3f51b5"}}>
                      <h2 style={{"margin":"0 0 10px 0","font-family":"sans-serif","font-size":"18px","line-height":"22px","color":"#3f51b5","font-weight":"bold"}}>
                        ACCOUNT:&nbsp;Plaid Checking.</h2>
                      <ul style={{"padding":"0","margin":"0 0 10px 0","list-style-type":"disc"}}>
                        <li style={{"margin":"0 0 10px 30px"}}><span style={{"font-weight":"bold"}}>DATE:</span>
                          Sun Nov 08 2020 00:00:00 GMT+0000
                          (Coordinated Universal Time)</li>
                        <li style={{"margin":"0 0 10px 30px"}}><span style={{"font-weight":"bold"}}>NAME:</span>
                          Starbucks</li>
                        <li style={{"margin":"0 0 0 30px"}} className="list-item-last"><span style={{"font-weight":"bold"}}>AMOUNT:</span> 4.33</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="non_top_transaction_block">
                    <td style={{"padding":"20px","font-family":"sans-serif","font-size":"15px","line-height":"20px","color":"#3f51b5"}}>
                      <h2 style={{"margin":"0 0 10px 0","font-family":"sans-serif","font-size":"18px","line-height":"22px","color":"#3f51b5","font-weight":"bold"}}>
                        ACCOUNT:&nbsp;Plaid Checking.</h2>
                      <ul style={{"padding":"0","margin":"0 0 10px 0","list-style-type":"disc"}}>
                        <li style={{"margin":"0 0 10px 30px"}}><span style={{"font-weight":"bold"}}>DATE:</span>
                          Sun Nov 08 2020 00:00:00 GMT+0000
                          (Coordinated Universal Time)</li>
                        <li style={{"margin":"0 0 10px 30px"}}><span style={{"font-weight":"bold"}}>NAME:</span>
                          Starbucks</li>
                        <li style={{"margin":"0 0 0 30px"}} className="list-item-last"><span style={{"font-weight":"bold"}}>AMOUNT:</span> 4.33</li>
                      </ul>
                    </td>
                  </tr>
                </tbody></table>
            </td>
          </tr>
          {/* 1 Column Text + Button : END */}
        </tbody></table>
      {/* Email Body : END */}
      {/* Email Footer : BEGIN */}
      <table align="center" role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%" style={{"margin":"auto"}}>
        <tbody><tr>
            <td style={{"padding":"20px","font-family":"sans-serif","font-size":"12px","line-height":"15px","-webkit-text-align":"center","text-align":"center","color":"#3f51b5"}}>
              <webversion>Go To <a style={{"color":"#3f51b5","-webkit-text-decoration":"underline","text-decoration":"underline","font-weight":"bold"}} href="https://fgr-kubernetes-demo.northcentralus.cloudapp.azure.com">FGR Budget App</a>
              </webversion>
              <br /><br />
              <webversion>Go To <a style={{"color":"#3f51b5","-webkit-text-decoration":"underline","text-decoration":"underline","font-weight":"bold"}} href="https://frankieriviera.com">FrankieRiviera.com</a>
              </webversion>
              <br /><br />
              FGR Solutions<br /><span className="unstyle-auto-detected-links">Detroit, MI.</span>
              <br /><br />
            </td>
          </tr>
        </tbody></table>
      {/* Email Footer : END */}
      {/*[if mso]>
      </td>
      </tr>
      </table>
      <![endif]*/}
    </div>
    {/*[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]*/}
  </center>
</div>
</>
}