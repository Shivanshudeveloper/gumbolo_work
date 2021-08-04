// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {  FaqsCategory, FaqsList, FaqsForm } from '../components/_external-pages/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function Faqs() {
  return (
    <RootStyle title="Privacy Policy | Minimal-UI">
      <Container sx={{ mt: 15, mb: 10 }}>

        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          Privacy Policy
        </Typography>
          <Typography variant="subtitle1">
              We respect the privacy of our users and every person who visits our site. Here, ”Website” or “Site” shall mean and include "https://gumbolo.com”, and any of our successor Websites; and “We”, “us”, and “our” are references to 99tech.io Private Limited.
We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at info@99tech.io.
When you visit our website www.gumbolo.com (“Site”) and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have concerning it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue the use of our site and our services.
          </Typography>
          <Typography variant="h4" sx={{mt:5 }}>
            About US
          </Typography>
          <Typography>
          At gumbolo.com, we provide easy to navigate and user-friendly website for giving users comprehensive information to make better property decisions. 
We provide you an independent services that have been designed to save your time.
          </Typography>
          <Typography variant="h5" sx={{mt:5}}>
          Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
          </Typography>
          <Typography variant="h6" sx={{mt:6}}>
                1.WHAT INFORMATION DO WE COLLECT?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products when participating in activities on the Site or otherwise contacting us.
The personal information that we collect depends on the context of your interactions with us and the Site, the choices you make, and the products and features you use. The personal information we collect can include the following:
<br />
<br />
Name and Contact Data: We collect your first and last name, postal address, phone number, and other similar contact data.
<br />
<br />
Information automatically collected:
We automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser, and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Site and other technical information.  If you access our site with your mobile device, we may automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information, and IP address. This information is primarily needed to maintain the security and operation of our Site, and for our internal analytics and reporting purposes.
Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Policy.
<br />
<br />
Information collected from other Sources:
We may obtain information about you from other sources, such as public databases, joint marketing partners, social media platforms (such as Facebook), as well as from other third parties. 
If you have chosen to subscribe to our newsletter, your first name, last name and e-mail address will be shared with our newsletter provider. This is to keep you updated with information and offers for marketing purposes.
          </Typography>
          <Typography variant="h6" sx={{mt:6}}>
                2.HOW DO WE USE YOUR INFORMATION?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          We use your personal information for these purposes in reliance on our legitimate business interests (“Business Purposes”), to enter into or perform a contract with you (“Contractual”), with your consent (“Consent”), and/or for compliance with our legal obligations (“Legal Reasons”). We indicate the specific processing grounds we rely on next to each purpose listed below.  
<br />
<br />
We use the information we collect or receive.
<br />
<br />
Request Feedback: for our Business Purposes and/or with your Consent. We may use your information to request feedback and to contact you about your use of our Site.
<br />
<br />
To protect our Site for Business Purposes and/or Legal Reasons.  We may use your information as part of our efforts to keep our Site safe and secure (for example, for fraud monitoring and prevention)         
<br />
<br />
To enforce our terms, conditions, and policies for our business purposes and as legally required.
<br />
<br />
To respond to legal requests and prevent harm as legally required. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.
 </Typography>
          <Typography variant="h6" sx={{mt:6}}>
                3.WILL YOUR INFORMATION BE SHARED WITH ANYONE?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          We only share and disclose your information in the following situations:
<br />
<br />
Compliance with Laws. We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal processes, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
<br />
<br />
Vital Interests and Legal Rights. We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
<br />
<br />
Third-Party Advertisers. We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to our Site and other websites that are contained in web cookies and other tracking technologies to provide advertisements about goods and services of interest to you. 
<br />
<br />
Business Partners. We may share your information with our business partners to offer you certain products, services, or promotions.
<br />
<br />
With your Consent. We may disclose your personal information for any other purpose with your consent.
<br />
<br />
Other Users. When you share personal information (for example, by posting comments, contributions, or other content to the Site) or otherwise interact with public areas of the Site, such personal information may be viewed by all users and may be publicly distributed outside the Site in perpetuity.
 </Typography>
 <Typography variant="h6" sx={{mt:6}}>
                4.DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. 
<br />
<br />
<strong>Cookies</strong>
<br />
<br />
A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. In general, cookies have two main purposes: to improve your browsing experience by remembering your actions and preferences and to help us analyze our website traffic.
<br />
<br />
<strong>What to do with Cookies?</strong>
<br />
<br />
We use cookies to help us analyze traffic to the Website, to help us improve website performance and usability, and to make the Website more secure. Third-party cookies help us use Google Analytics to count, track, and analyze visits to the Website. This helps us understand how people are using our websites and where we need to make improvements. These third-party cookies do not specifically identify you.
<br />
<br />
<strong>Performance, Analytics, Research & Advertising </strong>
<br />
<br />
Cookies help us learn how well our site and web products perform in different locations. We also use these to understand, improve, and research products, features, and services, including when you access this site https://gumbolo.com/ from other websites, applications, or devices such as your work computer or your mobile device. We also use third-party cookies to improve and personalize our marketing messages/communications with you.
<br />
<br />
<strong>Control cookies</strong>
<br />
<br />
You are always free to delete cookies that are already on your computer through your browser settings, and you can set most browsers to prevent them from being added to your computer. However, this may prevent you from using certain features on the Website.
<br />
<br />
 </Typography>
 
 <Typography variant="h6" sx={{mt:6}}>
 5.WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          The Site may contain advertisements from third parties that are not affiliated with us and which may link to other websites, online services, or mobile applications. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy policy. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Site. You should review the policies of such third parties and contact them directly to respond to your questions.
        </Typography>
 <Typography variant="h6" sx={{mt:6}}>
 6.HOW LONG DO WE KEEP YOUR INFORMATION?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). 
When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </Typography>
    <Typography variant="h6" sx={{mt:6}}>
    7.HOW DO WE KEEP YOUR INFORMATION SAFE?
            </Typography>
            <Typography variant="subtitle2" sx={{mt:6}}>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, the transmission of personal information to and from our Site is at your own risk. You should only access the services within a secure environment.
            </Typography>
    <Typography variant="h6" sx={{mt:6}}>
    8.WHAT ARE YOUR PRIVACY RIGHTS?
            </Typography>
            <Typography variant="subtitle2" sx={{mt:6}}>
                <strong>Personal Information</strong><br/><br/>
                You may at any time review or change the information by:
                <Typography sx={{pl:5,pr:5}}>Contacting us using the contact information provided below</Typography>
                <br/>
                We may delete or change your information, upon your request to delete your information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use, and/or comply with legal requirements.
                <br/> <br/>
                <strong>Cookies and similar technologies </strong>: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Site.
            </Typography>
            <Typography variant="h6" sx={{mt:6}}>
 9.DO WE MAKE UPDATES TO THIS POLICY?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
        </Typography>
        <Typography variant="h6" sx={{mt:6}}>
        10.HOW CAN YOU CONTACT US ABOUT THIS POLICY?
          </Typography>
          <Typography variant="subtitle2" sx={{mt:6}}>
          If you have questions or comments about this policy, email us at info@99tech.io.
        </Typography>
      </Container>
    </RootStyle>
  );
}
