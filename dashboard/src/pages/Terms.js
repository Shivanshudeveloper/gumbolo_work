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
    <RootStyle title="Terms | Minimal-UI">
      <Container sx={{ mt: 15, mb: 10 }}>

        <Typography variant="h2" align="center" sx={{ mb: 5 }}>
          Terms And Condition
        </Typography>
          <Typography variant="subtitle1">
          <strong>THE AGREEMENT</strong>:  The   use   of   this   website   and   services   on   this   website   and   mobileapplication   provided   by  https://www.gumbolo.com  (hereinafter   referred   to   as   "Website")   aresubject to the following Terms & Conditions, all parts and sub-parts of which are specificallyincorporated by reference here. This Agreement shall govern the use of all pages on this websiteand any services provided by or on this Website ("Services")
          </Typography>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            1) Definitions
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        a)  “Agreement”   refers   to   this   Terms   and   Conditions   and   the   Privacy   Policy   and   other documents provided to you by the Website;
        </Typography>
        <Typography>
        b)“We”, “us” and “our” are references to gumbolo
        </Typography>
        <Typography>
        c)“Service” or “Services” refers to any service shown below, which we may offer from our Website.
        </Typography>
        <Typography>
        d)  “User”,   “You”,   “Your”   and  “Customer”  refers   to   the   person   who   is   accessing   fortaking   any   service   from   us.   User   shall   include   the   company,   partnership,   sole   trader,person, body corporate or association taking services of this Website
        </Typography>
        <Typography>
        e)”Website”   shall   mean   and   includehttps://www.gumbolo.com   and   any   successorWebsite of the Company or any of its affiliates
        </Typography>
            <Typography>
            f)“Communication” shall mean and include any text or images, either on the website or inother forms (emails, etc.) which are intended, directly or indirectly, to sell products
            </Typography>
            <Typography>
            g)Parties: Collectively, the parties to this Agreement (We and You) will be referred to as Parties
            </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            2) ASSENT & ACCEPTANCE
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        By using the Website, you warrant that you have read and reviewed this Agreement and that youagree to be bound by it. If you do not agree to be bound by this Agreement, please leave theWebsite immediately. We only agree to provide the users of this Website and Services to you ifyou assent to this Agreement.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            3) SERVICE
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        At   gumbolo.com,   we   provide   easy   to   navigate   and   user-friendly   website   for   giving   userscomprehensive information to make better property decisions. 
We provide you an independent services that have been designed to save your time and money. 
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            4) AGE RESTRICTION
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You must be at least 18 (Eighteen) years of age to use this Website or any Services containedherein. By using this Website, you represent and warrant that you are at least 18 years of age andmay   legally   agree   to   this   Agreement.   We   assume   no   responsibility   or   liability   for   any misrepresentation of your age
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            5) GENERAL CONDITION
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        We do not guarantee the accuracy, completeness, validity, or timeliness of information listed byus.We make material changes to these terms and conditions from time to time, we may notify youeither by prominently posting a notice of such changes or via email communication.The website is licensed to you on a limited, non-exclusive, non-transferrable, non-sublicensablebasis,   solely   to   be   used   in   connection   with   the   Service   for   your   private,   personal,   non-commercial use, subject to all the terms and conditions of this Agreement as they apply to theService.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            6) REFUND POLICY
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        Our general policy is that no refund shall be applicable for any payment.However, in a determination to accomplish customer satisfaction, if there is an issue, you cancontact us through our email info@99tech.io.We take our customer's feedback very seriously and use it to constantly improve our productsand quality of service.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            7) INTELLECTUAL PROPERTY
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You   agree   that   the   Website   and   all   Services   provided   by   us   are   the   property   of   gumbolo   ,including all copyrights, trademarks, trade secrets, patents, and other intellectual property ("OurIP"). You agree that we own all right, titles, and interests in and to Our IP and that you will notuse Our IP for any unlawful or infringing purpose. You agree not to reproduce or distribute OurIP in any way, including electronically or via registration of any new trademarks, trade names,service marks, or Uniform Resource Locators (URLs), without express written permission fromus.
        </Typography>
        <Container sx={{pl:5,pr:5}}>
            <Typography>
            a) To make the Website and Services available to you, you hereby grant us a royalty-free, non-exclusive,   worldwide   license   to   copy,   display,   use,   broadcast,   transmit   and   make   derivativeworks of any content you publish, upload, or otherwise make available to the Website ("YourContent"). We claim no further proprietary rights in your Content    
            </Typography>
            <Typography>
            b)   If   you   feel   that   any   of   your   intellectual   property   rights   have   been   infringed   or   otherwise
violated by the posting of information or media by another of our users, please contact us and letus know
            </Typography>
        </Container>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            8) ACCEPTABLE USE
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You agree not to use the Website or Services for any unlawful purpose or any purpose prohibitedunder this clause. You agree not to use the Website or Services in any way that could damage theWebsite, Services, or general business of the gumbolo.a) <br/> You further agree not to use the Website or Services:
        </Typography>
        <Container sx={{pl:5,pr:5}}>
            <Typography>
            I) To harass, abuse, or threaten others or otherwise violate any person's legal rights    
            </Typography>
            <Typography>    
            II) To violate any of our intellectual property rights or any third party;
            </Typography>
            <Typography>    
            III) To upload or otherwise disseminate any computer viruses or other software that may damage the property of another;
            </Typography>
            <Typography>    
            IV) To perpetrate any fraud;
            </Typography>
            <Typography>    
            V) To engage in or create any unlawful gambling, sweepstakes, or pyramid scheme;
            </Typography>
            <Typography>    
            VI) To publish or distribute any obscene or defamatory material;
            </Typography>
            <Typography>    
            VII) To publish or distribute any material that incites violence, hate, or discrimination towards any group;
            </Typography>
            <Typography>    
            VIII) To unlawfully gather information about others.
            </Typography>
        </Container>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            9) ASSUMPTION OF RISK
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        The Website and Services are provided for communication purposes only. You acknowledge and agree that any information posted on Our Website is not intended to be legal advice, medical advice, or financial advice, and no fiduciary relationship has been created between you and us. You further agree that your purchase of any of the products on the Website is at your own risk. We do not assume responsibility or liability for any advice or other information given on the Website.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            10) REVERSE ENGINEERING & SECURITY
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You agree not to undertake any of the following actions:
        </Typography>
        <Container sx={{pl:5,pr:5}}>
            <Typography>
            a) Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or on the Website or Services;
            </Typography>
            <Typography>
            b) Violate the security of the Website or Services through any unauthorized access, circumvention of encryption or other security tools, data mining, or interference to any host, user, or network.
            </Typography>
        </Container>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            11) INDEMNIFICATION
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You agree to defend and indemnify us and any of our affiliates (if applicable) and hold us harmless against all legal claims and demands, including reasonable attorney's fees, which may arise from or relate to your use or misuse of the Website or Services, your breach of this Agreement, or your conduct or actions. You agree that we shall be able to select its legal counsel and may participate in its defense if we wish.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            12) EXCLUSION OF LIABILITY
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You understand and agree that we (A) do not guarantee the accuracy, completeness, validity, or timeliness of information listed by us or any third parties; and (B) shall not be responsible for any materials posted by us or any third party. You shall use your judgment, caution, and common sense in evaluating any prospective methods or offers and any information provided by us or any third party.
Further, we shall not be liable for direct, indirect consequential, or any other form of loss or damage that may be suffered by a user through the use of the https://www.gumbolo.com. The website including loss of data or information or any kind of financial or physical loss or damage.
In no event shall gumbolo , nor its Owner, directors, employees, partners, agents, suppliers, or affiliates, be accountable for any indirect, incidental, special, eventful, or exemplary costs, including without limitation, loss of proceeds, figures, usage, goodwill, or other intangible losses, consequential from (i) your use or access of or failure to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content attained from the Service; and (iv) unlawful access, use or alteration of your transmissions or content, whether or not based on guarantee, agreement, domestic wrong (including carelessness) or any other lawful concept, whether or not we've been aware of the possibility of such damage, and even if a cure set forth herein is originated to have futile of its important purpose.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            13) SPAM POLICY
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You are strictly prohibited from using the Website or any of our's Services for illegal spam activities, including gathering email addresses and personal information from others or sending any mass commercial emails.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            14) THIRD-PARTY LINKS & CONTENT
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        We may occasionally post links to third-party websites or other services. You agree that we are not responsible or liable for any loss or damage caused as a result of your use of any third-party services linked to Our Website.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            15) MODIFICATION & VARIATION
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        We may, from time to time and at any time without notice to you, modify this Agreement. You agree that we have the right to modify this Agreement or revise anything contained herein. You further agree that all modifications to this Agreement are in full force and effect immediately upon posting on the Website and that modifications or variations will replace any prior version of this Agreement unless prior versions are specifically referred to or incorporated into the latest modification or variation of this Agreement.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            16) ENTIRE AGREEMENT
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        This Agreement constitutes the entire understanding between the Parties concerning all use of this Website. This Agreement supersedes and replaces all prior or contemporaneous agreements or understandings, written or oral, regarding the use of this Website.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            17)  SERVICE INTERRUPTIONS
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        We may need to interrupt your access to the Website to perform maintenance or emergency services on a scheduled or unscheduled basis. You agree that your access to the Website may be affected by unanticipated or unscheduled downtime, for any reason, but that we shall have no liability for any damage or loss caused as a result of such downtime.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
              18) TERM, TERMINATION & SUSPENSION
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        We may terminate this Agreement with you at any time for any reason, with or without cause. We specifically reserve the right to terminate this Agreement if you violate any of the terms outlined herein, including, but not limited to, violating the intellectual property rights of us or a third party, failing to comply with applicable laws or other legal obligations, and/or publishing or distributing illegal material. If you have registered for an account with Us, You may also terminate this Agreement at any time by contacting Us and requesting termination. At the termination of this Agreement, any provisions that would be expected to survive termination by their nature shall remain in full force and effect.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            19) NO WARRANTIES
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        You agree that your use of the Website and Services is at your sole and exclusive risk and that any Services provided by Us are on an "As Is" basis. We hereby expressly disclaim all express or implied warranties of any kind, including, but not limited to the implied warranty of fitness for a particular purpose- and the implied warranty of merchantability. We make no warranties that the Website or Services will meet your needs or that the Website or Services will be uninterrupted, error-free, or secure. We also make no warranties as to the reliability or accuracy of any information on the Website or obtained through the Services. You agree that any damage that may occur to you, through your computer system, or as a result of the loss of your data from your use of the Website or Services is your sole responsibility and that we are not liable for any such damage or loss.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            20) LIMITATION ON LIABILITY
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
        We are not liable for any damages that may occur to you as a result of your use of the Website or Services, to the fullest extent permitted by law. This section applies to any claims by you, including, but not limited to, lost profits or revenues, consequential or punitive damages, negligence, strict liability, fraud, or torts of any kind.
        </Typography>
        </Container>
        </Container>
        <Container sx={{mt:5}}>
        <Typography variant ="h5" sx={{mt:3}}>
            21) GENERAL PROVISIONS:
        </Typography>
        <Container sx={{pl:10,pr:10}}>
        <Typography>
         a) JURISDICTION, VENUE & CHOICE OF LAW: The terms herein will be governed by and construed under the laws of India and the State of Gujarat without giving effect to any principles of conflicts of law. The Courts of the State of Gujarat shall have exclusive jurisdiction over any dispute arising from the use of the Website.
        </Typography>
        <Typography>
        b) ASSIGNMENT: This Agreement, or the rights granted hereunder, may not be assigned, sold, leased, or otherwise transferred in whole or part by you. Should this Agreement, or the rights granted hereunder, be assigned, sold, leased, or otherwise transferred by us, the rights and liabilities of the gumbolo will bind and inure to any assignees, administrators, successors, and executors.
        </Typography>
        <Typography>
        c) SEVERABILITY: If any part or sub-part of this Agreement is held invalid or unenforceable by a court of law or competent arbitrator, the remaining parts and sub-parts will be enforced to the maximum extent possible. In such a condition, the remainder of this Agreement shall continue in full force.*
        </Typography>
        <Typography>
        d) NO WAIVER: If we fail to enforce any provision of this Agreement, this shall not constitute a waiver of any future enforcement of that provision or any other provision. Waiver of any part or sub-part of this Agreement will not constitute a waiver of any other part or sub-part.	
        </Typography>
        <Typography>
        e) HEADINGS FOR CONVENIENCE ONLY: Headings of parts and sub-parts under this Agreement are for convenience and organization, only. Headings shall not affect the meaning of any provisions of this Agreement.
        </Typography>
        <Typography>
        f) NO AGENCY, PARTNERSHIP, OR JOINT VENTURE: No agency, partnership, or joint venture has been created between the Parties as a result of this Agreement. No Party has any authority to bind the other to third parties
        </Typography>
        <Typography>
        g) FORCE MAJEURE: We are not liable for any failure to perform due to causes beyond its reasonable control including, but not limited to, acts of God, acts of civil authorities, acts of military authorities, riots, embargoes, acts of nature, and natural disasters, and other acts which may be due to unforeseen circumstances.
        </Typography>
        <Typography>
        h) ELECTRONIC COMMUNICATIONS PERMITTED: Electronic communications are permitted to both Parties under this Agreement, including e-mail or fax. For any questions or concerns, please email us at the following address: info@99tech.io.
        </Typography>
        </Container>
        </Container>
        
      </Container>
    </RootStyle>
  );
}
