import { useEffect, useState } from 'react';
import AboutHero from "src/sections/about/about-hero"
import AboutWhat from "src/sections/about/about-what2"

const PrivacyPolicyView = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST_API}/api/admin/content/privacy-policy`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setContent(res.data.html);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <div>
            <AboutHero data={{ title: "Our", list: ["Privacy policy"] }} />
            <AboutWhat data={{ title: "", content: content || `<h1>Privacy Policy</h1>
<p>This is the privacy policy content.</p>
<h2>Information Collection</h2>
<p>We collect information from you when you use our services, including personal details and usage data</p>
<h2>Use of Information</h2>
<p>We use the information we collect to provide and improve our services, communicate with you, and comply with legal obligations.</p>`, image: '/assets/privacy-policy.jpeg' }} />
        </div>
    )
}

export default PrivacyPolicyView