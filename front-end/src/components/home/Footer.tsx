import LanguageIcon from '@mui/icons-material/Language';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { isMobile } from '../../util/util';
import { CONFIG } from '../../util/config';

export default function Footer() {

    const linkWhatsapp = isMobile ? 'https://api.whatsapp.com/send?phone=55' + CONFIG.tel 
                                    : 'https://web.whatsapp.com/send?phone=55' + CONFIG.tel;

    const targetValue = isMobile ? '_self' : '_blank';

    const conf = {
        site: CONFIG.urlBase.replaceAll('https://', ''),
        siteLink: CONFIG.urlBase,
        
        email: CONFIG.email,
        emailLink: 'mailto:' + CONFIG.email,

        whatsapp: CONFIG.tel,
        whatsappLink: linkWhatsapp,
    }

    return (
        <footer id="main-contact">
            <div className="footer-container">
                <div className="footer-desc-container">
                    <h3 className="footer-title">{CONFIG.nameSystem}</h3>
                </div> 
                <div className="footer-links-container">
                    <div className="footer-links-container-list">
                        <a href="javascript:void(0)">
                            <LanguageIcon className="footer-links-container-icon" /> 
                            {conf.site}
                        </a>
                    </div>
                    {conf.email.length > 0 ?
                        <div className="footer-links-container-list">
                            <a target={targetValue} href={conf.emailLink}>
                                <AttachEmailIcon className="footer-links-container-icon" /> 
                                {conf.email}
                            </a>
                        </div> : <></>
                    }
                    {conf.whatsapp.length > 0 ?
                        <div className="footer-links-container-list">
                            <a target={targetValue} href={conf.whatsappLink}>
                                <WhatsAppIcon className="footer-links-container-icon" /> 
                                {conf.whatsapp}
                            </a>
                        </div> : <></>
                    }
                    
                </div>
                <div className="footer-copy-rigth-container">
                </div>
            </div>
        </footer>
    )
  
  }