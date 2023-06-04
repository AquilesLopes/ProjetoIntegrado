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
        site: CONFIG.site.replaceAll('https://', ''),
        siteLink: CONFIG.site,
        
        email: CONFIG.email,
        emailLink: 'mailto:' + CONFIG.email,

        whatsapp: CONFIG.tel,
        whatsappLink: linkWhatsapp,
    }

    function topPage(){
        var stepTime = 20;
        var docBody = document.body;
        var focElem = document.documentElement;
        
        var scrollAnimationStep = function (initPos : number, stepAmount : number) {
            var newPos = initPos - stepAmount > 0 ? initPos - stepAmount : 0;
        
            docBody.scrollTop = focElem.scrollTop = newPos;
        
            newPos && setTimeout(function () {
                scrollAnimationStep(newPos, stepAmount);
            }, stepTime);
        }
        
        var scrollTopAnimated = function (speed : number) {
            var topOffset = docBody.scrollTop || focElem.scrollTop;
            var stepAmount = topOffset;
        
            speed && (stepAmount = (topOffset * stepTime)/speed);
        
            scrollAnimationStep(topOffset, stepAmount);
        };
    }

    return (
        <footer id="main-contact">
            <div className="footer-container">
                <div className="footer-desc-container">
                    <p className="footer-title">{CONFIG.nameSystem}</p>
                    <p>
                        Code licensed 
                        <a href={CONFIG.license.url} target="_blank">
                            {CONFIG.license.name}
                        </a>
                    </p>
                    <p>
                        Currently {CONFIG.version}
                    </p>
                </div> 
                <div className="footer-links-container">
                    <div className="footer-links-container-list">
                        <a href="javascript:void(0)" onClick={topPage}>
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