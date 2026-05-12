const STORAGE_KEY = "threatsim_profile_v2";

const defaultProfile = {
    name:"",
    score:100,
    threat:0,
    unlockedLevel:10,
    completedLevels:[],
    activeLevel:1,
    viewFinal:false,
    safeDecisions:0,
    riskyDecisions:0,
    dangerousDecisions:0,
    decisionHistory:[],
    riskFlags:{
        identityExposed:false,
        bankCompromised:false,
        remoteAccessInstalled:false,
        investmentTargeted:false,
        utilityDataShared:false,
        malwareExposure:false
    },
    patternCounts:{
        fear:0,
        greed:0,
        trust:0,
        convenience:0,
        verification:0
    },
    achievements:[],
    consequenceHistory:[]
};

const levels = [
    {
        id:1,
        state:"Maharashtra",
        title:"Digital Arrest Cyber Scam",
        type:"Government impersonation scam",
        interface:"Phone call, fake police dashboard, video call",
        summary:"A caller claims your Aadhaar is linked to criminal activity and tries to isolate you inside a fake legal emergency.",
        psychology:"Fear, authority bias, urgency, intimidation",
        cyber:"Government impersonation, social engineering, payment fraud",
        safety:"No police department conducts an arrest or investigation through a private video call. Disconnect and verify through official local police channels.",
        realCase:{
            state:"Maharashtra",
            year:"2025",
            impact:"Digital arrest scams in Maharashtra caused huge losses as fraudsters impersonated CBI, ED and police officials. Victims were isolated through calls, fake documents and threats before being pushed to move money into so-called safe accounts.",
            sourceTitle:"NDTV: Maharashtra Cyber Department probes Rs 58 crore digital arrest scam",
            sourceUrl:"https://www.ndtv.com/india-news/maharashtra-cyber-department-probes-one-of-indias-biggest-digital-scam-rs-58-crore-international-network-links-9618331",
            tip:"Government agencies never demand money transfers through calls or video conferences."
        },
        stages:[
            {
                label:"Stage 1 - Incoming Call",
                title:"Unknown number calling",
                text:"The number keeps ringing. The caller ID says Mumbai Cyber Cell, but it is not saved in your contacts.",
                ui:phoneUI("Mumbai Cyber Cell", "+91 22 4891 7750", "Aadhaar verification emergency"),
                choices:[
                    choice("Answer, take notes, and ask which station registered the case", "risk", -10, "Taking notes helps, but staying inside the scammer's call still gives them control of the pressure."),
                    choice("Say you will call back through the cyber cell number listed on an official site", "safe", 10, "Unknown legal threats should be verified independently."),
                    choice("Confirm only partial identity details so they can pull up the file", "danger", -20, "Even partial personal data can help the scammer make the story more convincing.")
                ]
            },
            {
                label:"Stage 2 - Fake Documents",
                title:"The scammer sends official-looking files",
                text:"You receive a fake police ID, an arrest warrant, and an FIR PDF. The language is threatening and the logos look copied.",
                ui:docsUI(["Police ID: Inspector Rajveer S.", "Arrest Warrant: Aadhaar-linked money laundering", "FIR Extract: Confidential case file"]),
                choices:[
                    choice("Pause the conversation and verify the case number through a police station number you find yourself", "safe", 10, "Verification must happen outside the scammer's channel."),
                    choice("Inspect the seals, signatures, and PDF formatting while the caller waits", "risk", -10, "Fake documents are often built from copied seals, logos, and legal language."),
                    choice("Send a masked ID photo because the caller says the file has a name mismatch", "danger", -20, "That gives the scammer more identity data to use against you.")
                ]
            },
            {
                label:"Stage 3 - Surveillance Threat",
                title:"You are told not to disconnect",
                text:"The caller says you are under digital surveillance. A fake countdown appears and the voice becomes aggressive.",
                ui:govWarningUI("DIGITAL SURVEILLANCE ACTIVE", "Do not disconnect. Non-compliance will trigger immediate arrest.", "04:59"),
                choices:[
                    choice("Move to another room so you can hear the instructions clearly", "risk", -10, "Isolation is part of the trap. They want you away from family, banks, and police."),
                    choice("Put the call on speaker and ask someone nearby to listen too", "safe", 10, "Breaking isolation weakens the manipulation."),
                    choice("Open screen sharing after closing banking apps", "danger", -20, "Screen sharing can still expose OTPs, contacts, notifications, and private files.")
                ]
            },
            {
                label:"Stage 4 - Money Demand",
                title:"Secure government account transfer",
                text:"The scammer says your funds must be transferred for verification and will be returned after the investigation.",
                ui:paymentUI("Secure Government Account", "Transfer requested", "Rs 2,50,000", "Verification deposit"),
                choices:[
                    choice("Ask for written transfer instructions and take them to a police station before paying", "safe", 10, "Official verification ends the scam safely."),
                    choice("Keep the call connected while checking whether you can arrange the amount", "risk", -10, "Silence keeps you trapped in their pressure environment."),
                    choice("Send a smaller refundable amount first to show cooperation", "danger", -20, "Government agencies do not ask citizens to transfer money to prove innocence.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:2,
        state:"Uttar Pradesh",
        title:"Water Bill Disconnection Scam",
        type:"Utility bill impersonation scam",
        interface:"WhatsApp alert, fake bill portal, payment and APK prompt",
        summary:"A fake Noida-style water supply alert threatens late-night disconnection and pushes you toward a bill update officer.",
        psychology:"Fear of service loss, time pressure, authority cues, convenience bias",
        cyber:"Utility phishing, APK malware, UPI payment fraud, impersonation",
        safety:"Utility departments do not ask residents to install APK files or pay through personal links sent on WhatsApp. Verify through the official authority portal or printed bill contact.",
        realCase:{
            state:"Uttar Pradesh",
            year:"2025",
            impact:"Noida residents were warned about fake WhatsApp messages using the Noida Jal logo and threatening water disconnection. The scam pushed people to contact a fake bill update officer and avoid official channels.",
            sourceTitle:"Moneycontrol: Noida Authority warns residents of fake water disconnection scam",
            sourceUrl:"https://www.moneycontrol.com/city/noida-authority-warns-residents-of-fake-water-disconnection-scam-on-whatsapp-never-open-that-link-article-13240710.html",
            tip:"Never open APK files or payment links sent through utility-bill WhatsApp messages."
        },
        stages:[
            {
                label:"Stage 1 - WhatsApp Notice",
                title:"Water supply disconnection tonight",
                text:"A WhatsApp message uses a civic authority logo and says your water connection will be disconnected at 9:30 PM because last month's bill is not updated.",
                ui:chatUI("Noida Jal Update", ["Dear consumer, your water supply will be disconnected tonight at 9:30 PM.", "Last bill is not updated in system.", "Call bill update officer immediately to avoid disconnection."]),
                choices:[
                    choice("Check the consumer number in your official bill or authority portal before responding", "safe", 10, "Real utility issues should be visible in official billing records, not only in a WhatsApp warning."),
                    choice("Call the number in the message to ask what bill is pending", "risk", -10, "Calling the listed number keeps you inside the scammer's channel."),
                    choice("Confirm the meter address and last payment date shown in the message", "danger", -20, "Sharing account details helps the scammer personalize the fraud and sound more convincing.")
                ]
            },
            {
                label:"Stage 2 - Bill Update Officer",
                title:"Only Rs 12 is pending",
                text:"The person on the phone says the bill is paid but not updated in the server. They send a link for a Rs 12 verification payment.",
                ui:paymentUI("Water Bill Update", "Server verification fee", "Rs 12", "Pay now to stop auto-disconnection"),
                choices:[
                    choice("Ask for the complaint or receipt number and check it on the official portal yourself", "safe", 10, "Moving verification to the official portal removes the attacker's payment link."),
                    choice("Use a secondary wallet for the Rs 12 check so your main bank stays separate", "danger", -20, "Tiny payments are often bait to capture card, UPI, or banking details."),
                    choice("Ask them to send the same payment link by SMS for record keeping", "risk", -10, "Changing the delivery channel does not make the link trustworthy.")
                ]
            },
            {
                label:"Stage 3 - App Installation",
                title:"Install the quick update app",
                text:"The officer says the portal is slow and sends an APK that will supposedly update your bill status in two minutes.",
                ui:popupUI("Bill Update APK", "Install this utility app to sync your consumer record before disconnection."),
                choices:[
                    choice("Search for the official utility app from the app store or authority website", "safe", 10, "Official apps should be found through trusted stores or verified websites, not random APK links."),
                    choice("Download the APK but wait before installing it", "risk", -10, "Keeping unknown APK files increases the chance of accidental installation."),
                    choice("Install it only long enough to update the bill, then remove it", "danger", -20, "Unknown APKs can steal SMS, notifications, banking data, and OTPs.")
                ]
            },
            {
                label:"Stage 4 - Countdown Pressure",
                title:"Disconnection crew assigned",
                text:"The caller says a field team is already on the way and the only way to stop it is a fast UPI update.",
                ui:govWarningUI("UTILITY DISCONNECTION QUEUED", "Payment update required before 9:30 PM.", "06:00"),
                choices:[
                    choice("Use the official customer-care number from your bill and ask about the disconnection notice", "safe", 10, "Independent official contact is the safest way to confirm utility issues."),
                    choice("Open UPI while the officer guides you through the pending update", "danger", -20, "The caller can guide you into approving a payment or sharing sensitive information."),
                    choice("Ask a neighbor if they received the same message before deciding", "risk", -10, "Checking with others can help, but it should not replace official verification.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:3,
        state:"Gujarat",
        title:"Fake Investment and Trading Scam",
        type:"Online investment fraud",
        interface:"Instagram ad, Telegram group, fake trading dashboard",
        summary:"A high-return ad leads to a Telegram group where fake users post profits and a fake app blocks withdrawals.",
        psychology:"Greed, social proof, overconfidence, FOMO",
        cyber:"Fake trading apps, investment fraud, crypto scams",
        safety:"Guaranteed returns and withdrawal fees are major red flags. Verify registration, app publisher, and regulatory details.",
        realCase:{
            state:"Gujarat",
            year:"2025",
            impact:"Gujarat police warned about pig-butchering style investment scams where victims were befriended online, moved to WhatsApp or Telegram, and shown fake trading profits before being blocked from withdrawals.",
            sourceTitle:"Connect Gujarat: Pig butchering scam costs Gujarat victims up to Rs 66 lakh",
            sourceUrl:"https://connectgujarat.com/news/dating-app-pig-butchering-scam-costs-gujarat-victims-up-to-66-lakh-police-issue-warning-10907295",
            tip:"Never trust trading apps or advisors that cannot be verified through SEBI or official app stores."
        },
        stages:[
            {
                label:"Stage 1 - Instagram Ad",
                title:"Earn Rs 50,000 weekly",
                text:"A polished ad promises high returns with screenshots of luxury purchases and a link to join a private group.",
                ui:hotelUI("TradePro Elite", "Guaranteed weekly profits", "Join 18,000 Gujarat investors today"),
                choices:[
                    choice("Join with notifications muted and avoid sharing details", "risk", -10, "Curiosity is understandable, but scam funnels start with easy entry."),
                    choice("Look for registration, app publisher details, and complaints before joining", "safe", 10, "Legitimate investment services can be verified."),
                    choice("Request a mentor call before deciding how much to start with", "danger", -20, "Now the scammer can pressure you directly.")
                ]
            },
            {
                label:"Stage 2 - Social Proof",
                title:"Telegram users celebrate profits",
                text:"Several members post screenshots saying they earned Rs 30,000 today. The admin deletes skeptical comments.",
                ui:chatUI("Crypto Alpha Signals", ["I invested 10k and got 38k!", "Withdrawal received in 5 minutes.", "Admin is trusted. Do not miss tonight's slot."]),
                choices:[
                    choice("Ask one of the members privately how withdrawals work", "risk", -10, "Screenshots are easy to fake and group members may be bots."),
                    choice("Step back when critical questions disappear from the group", "safe", 10, "Suppressed questions are a warning sign."),
                    choice("Ask the admin to reserve a place while you arrange funds", "danger", -20, "That invites direct manipulation and payment pressure.")
                ]
            },
            {
                label:"Stage 3 - Fake Profits",
                title:"The app shows your money growing",
                text:"Your Rs 5,000 deposit appears as Rs 17,850. The chart moves upward every few seconds.",
                ui:tradingUI("MindTradeX", "Rs 17,850", [20,35,42,58,72,86,96]),
                choices:[
                    choice("Attempt a withdrawal and check company details before adding funds", "safe", 10, "Withdrawal blocks often reveal the scam."),
                    choice("Add a small test amount to see whether the profit graph stays consistent", "danger", -20, "The chart is controlled by the scammer, not a real market."),
                    choice("Share the app with a friend who understands trading", "risk", -10, "Sharing an unverified scheme can spread harm.")
                ]
            },
            {
                label:"Stage 4 - Withdrawal Trap",
                title:"Pay tax to unlock withdrawal",
                text:"The admin says you must deposit more to release your profits. The deadline is 10 minutes.",
                ui:paymentUI("Trading Wallet", "Unlock withdrawal", "Rs 25,000", "Tax and verification fee"),
                choices:[
                    choice("Ask for the fee to be deducted from the displayed profit", "risk", -10, "Negotiation keeps you inside the scammer's frame."),
                    choice("Preserve screenshots and stop sending money", "safe", 10, "Preserve evidence and do not send more money."),
                    choice("Pay the fee from outside the app because the profit balance is temporarily locked", "danger", -20, "Scammers keep inventing fees until the victim stops paying.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:4,
        state:"Karnataka",
        title:"Fake Tech Support Scam",
        type:"Remote access scam",
        interface:"Virus popup and fake support page",
        summary:"A scary browser warning claims your computer is infected and asks you to call support and install remote access software.",
        psychology:"Panic, technical confusion, fear of losing data",
        cyber:"Remote access scams, malware, fake support fraud",
        safety:"Real security warnings do not ask you to call a random number or install remote access tools.",
        realCase:{
            state:"Karnataka / India",
            year:"2025",
            impact:"Indian authorities and Microsoft helped disrupt tech-support scam networks that used fake security alerts and call-centre scripts to convince victims their devices were compromised.",
            sourceTitle:"The New Indian Express: CBI busts transnational tech support scam under Operation Chakra-V",
            sourceUrl:"https://www.newindianexpress.com/nation/2025/May/29/operation-chakra-v-cbi-busts-transnational-scam-that-posed-as-tech-support-to-cheat-japanese-citizens",
            tip:"Never install remote-access tools because a popup or unknown caller says your device is infected."
        },
        stages:[
            {
                label:"Stage 1 - Virus Popup",
                title:"Your computer is infected",
                text:"A full-screen warning blocks the browser and repeats an alarm-style message.",
                ui:popupUI("Windows Security Alert", "Trojan detected. Banking passwords at risk."),
                choices:[
                    choice("Use Task Manager or the browser controls, then check security settings directly", "safe", 10, "Browser popups can imitate system warnings."),
                    choice("Run the page's scan once before closing the browser", "risk", -10, "Fake scan buttons can lead to more malicious pages."),
                    choice("Call the support line shown so they can confirm whether data is exposed", "danger", -20, "The number connects you directly to the scammer.")
                ]
            },
            {
                label:"Stage 2 - Fake Support",
                title:"A support page asks for a call",
                text:"The page uses Microsoft-style colors and says your device will be disabled if you close it.",
                ui:emailUI("Microsoft Support Center", "support@microsoft-secure-help.com", "Critical device lock warning", "Call the support engineer immediately. Do not restart your computer."),
                choices:[
                    choice("Open Windows Security from the Start menu instead of the webpage", "safe", 10, "Use built-in security tools directly."),
                    choice("Search the displayed number before deciding whether to call", "risk", -10, "Better than calling, but fake pages can flood search results too."),
                    choice("Call before restarting because the page warns about file deletion", "danger", -20, "Fake support agents use calls to guide victims into remote access.")
                ]
            },
            {
                label:"Stage 3 - Remote Access Request",
                title:"Install AnyDesk or TeamViewer",
                text:"The support executive says they need remote control to remove the virus.",
                ui:portalUI("Remote Session Request", [["Tool", "AnyDesk"], ["Requested access", "Full control"], ["Reason", "Virus cleanup"], ["Session risk", "High"]]),
                choices:[
                    choice("Ask them to email official instructions before doing anything", "risk", -10, "Installing unnecessary tools still increases risk."),
                    choice("End the session and contact device support from a saved or official source", "safe", 10, "Unknown callers should not control your device."),
                    choice("Allow remote access while watching the screen closely", "danger", -20, "Remote access can let scammers view files and banking sessions.")
                ]
            },
            {
                label:"Stage 4 - Recovery",
                title:"What do you do next?",
                text:"The popup is gone, but you are unsure whether the device is safe.",
                ui:portalUI("Device Safety Checklist", [["Step 1", "Close browser"], ["Step 2", "Run trusted scan"], ["Step 3", "Update browser"], ["Step 4", "Change passwords if exposed"]]),
                choices:[
                    choice("Run a scan from trusted security software and update the browser", "safe", 10, "Good recovery practice."),
                    choice("Close everything and assume it was only an ad", "risk", -10, "Some popups are harmless, but checking is safer."),
                    choice("Try the cleaner linked in the warning after reading a few reviews", "danger", -20, "That may install malware.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:5,
        state:"Rajasthan",
        title:"Marketplace Payment Scam",
        type:"UPI fraud and marketplace scam",
        interface:"Marketplace listing, buyer chat, fake payment screen, UPI request",
        summary:"A buyer on a resale marketplace behaves unusually fast, sends fake payment proof, and tries to make you approve a UPI collect request.",
        psychology:"Trust pressure, urgency, transaction anxiety, confusion between sending and receiving money",
        cyber:"UPI collect request scam, fake payment screenshots, payment notification fraud",
        safety:"Receiving money never requires entering your UPI PIN. Confirm incoming payments only inside your bank or UPI app transaction history.",
        realCase:{
            state:"Rajasthan / India",
            year:"2025",
            impact:"UPI collect requests became a major fraud channel because scammers could make victims believe they were receiving money while actually approving a debit from their own account.",
            sourceTitle:"Moneycontrol: NPCI to stop UPI person-to-person collect requests to combat fraud",
            sourceUrl:"https://www.moneycontrol.com/technology/npci-to-stop-upi-person-to-person-collect-requests-from-october-to-combat-fraud-article-13449038.html",
            tip:"A UPI PIN is used to send money, not to receive money from a buyer."
        },
        stages:[
            {
                label:"Stage 1 - Product Listing",
                title:"You list your old phone for sale",
                text:"Within two minutes, a buyer messages you and says they will buy it at the listed price without asking many questions.",
                ui:portalUI("QuickSell Marketplace", [["Item", "OnePlus 11 - used"], ["Listed price", "Rs 28,000"], ["Buyer status", "Ready to pay now"], ["Chat tone", "Fast and eager"]]),
                choices:[
                    choice("Keep the chat on the marketplace app and ask for normal pickup details", "safe", 10, "Keeping the conversation inside the platform preserves records and reduces manipulation."),
                    choice("Move to WhatsApp because the buyer says marketplace chat is slow", "risk", -10, "Moving outside the platform makes the interaction harder to report and verify."),
                    choice("Share your UPI ID immediately so the buyer can pay before someone else buys it", "danger", -20, "Early payment pressure is often used to pull sellers into UPI request scams.")
                ]
            },
            {
                label:"Stage 2 - Fake Payment Proof",
                title:"Payment pending screenshot arrives",
                text:"The buyer sends a screenshot showing Rs 28,000 as payment pending and says you must accept quickly before the bank reverses it.",
                ui:paymentUI("Marketplace Buyer", "Payment Pending", "Rs 28,000", "Accept request within 04:00 to receive funds"),
                choices:[
                    choice("Check your own UPI or bank app before reacting to the screenshot", "safe", 10, "Screenshots can be edited. Your own transaction history is the trusted source."),
                    choice("Ask the buyer to resend the screenshot with today's timestamp", "risk", -10, "A better screenshot is still not proof that money reached your account."),
                    choice("Tell the buyer you will accept the pending request before it expires", "danger", -20, "Accepting a collect request sends money from your account instead of receiving it.")
                ]
            },
            {
                label:"Stage 3 - UPI Verification",
                title:"Enter PIN to receive payment",
                text:"A UPI collect request appears. The buyer says sellers must enter their PIN once to release marketplace payments.",
                ui:govWarningUI("PAYMENT PENDING", "UPI request expires soon. Enter PIN to complete receipt.", "02:30"),
                choices:[
                    choice("Stop at the PIN screen and read whether money is being sent or received", "safe", 10, "UPI PIN approval is for authorizing money movement from your account."),
                    choice("Ask the buyer to explain the process one more time before deciding", "risk", -10, "The scammer will explain the screen in a way that benefits the scam."),
                    choice("Enter the UPI PIN because the amount matches the sale price", "danger", -20, "Entering the PIN approves the payment request and can deduct money from your account.")
                ]
            },
            {
                label:"Stage 4 - Transaction Anxiety",
                title:"The buyer says your account is blocking the payment",
                text:"The buyer becomes impatient and claims the money is already debited from their side. They threaten to report you as a fraud seller.",
                ui:chatUI("Marketplace Buyer", ["I already paid Rs 28,000.", "You are blocking my payment by not accepting.", "Accept now or I will report your number."]),
                choices:[
                    choice("Block the buyer, report the chat, and continue only through verified platform payment options", "safe", 10, "Real buyers do not need your UPI PIN or collect-request approval to pay you."),
                    choice("Keep negotiating because the buyer may genuinely be confused", "risk", -10, "Longer engagement gives the scammer more chances to pressure you."),
                    choice("Approve the request to avoid being reported as a seller", "danger", -20, "This approves money leaving your account and rewards the pressure tactic.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:6,
        state:"Kerala",
        title:"AI Deepfake Scam",
        type:"Synthetic media impersonation fraud",
        interface:"Video call and emergency payment screen",
        summary:"A realistic-looking relative appears distressed on video and asks for emergency money.",
        psychology:"Emotional trust, panic, visual persuasion, familiarity bias",
        cyber:"AI deepfakes, impersonation, synthetic media fraud",
        safety:"Use a family passphrase, call back on a known number, or verify through another trusted person before sending money.",
        realCase:{
            state:"Kerala",
            year:"2025",
            impact:"Kerala cyber police reported a rise in AI deepfake scams using manipulated videos on social media. Fraudsters used realistic synthetic media to push victims toward fake financial schemes.",
            sourceTitle:"The New Indian Express: Deepfake investment scams on the rise in Kerala",
            sourceUrl:"https://www.newindianexpress.com/amp/story/states/kerala/2025/Jun/26/deepfake-investment-scams-on-the-rise-in-kerala-over-1k-videos-taken-down-last-year",
            tip:"Verify urgent money requests through a known number or family passphrase, even if the face or voice looks real."
        },
        stages:[
            {
                label:"Stage 1 - Video Call",
                title:"Incoming call from your cousin",
                text:"The face looks familiar, but the video quality is low and the call came from a new number.",
                ui:videoUI("Cousin", "New number", "Poor network"),
                choices:[
                    choice("Answer, but ask why they are calling from a new number", "safe", 10, "Observation helps you detect mismatched details."),
                    choice("Continue because the face and voice seem familiar", "risk", -10, "Deepfakes exploit familiarity."),
                    choice("Discuss how much money you can arrange right now", "danger", -20, "Never reveal financial details during pressure calls.")
                ]
            },
            {
                label:"Stage 2 - Distress Message",
                title:"I urgently need money",
                text:"The voice says there was an accident and asks you not to tell anyone yet.",
                ui:chatUI("Cousin - new number", ["Please do not call home.", "I need Rs 40,000 right now.", "I will explain later."]),
                choices:[
                    choice("Call a family member from your saved contacts while keeping this request paused", "safe", 10, "Independent verification is the strongest defense."),
                    choice("Ask a personal question in the same chat before paying", "risk", -10, "A scammer may know details from social media."),
                    choice("Send a first amount to reduce the immediate emergency pressure", "danger", -20, "Emotional pressure can override caution.")
                ]
            },
            {
                label:"Stage 3 - Realistic Face",
                title:"The face and voice seem real",
                text:"The video pauses whenever you ask detailed questions. The caller pushes for immediate payment.",
                ui:videoUI("Cousin", "Face match: high", "Audio delay detected"),
                choices:[
                    choice("Ask for a family passphrase or switch to the number already saved in your phone", "safe", 10, "Pre-agreed verification beats visual confidence."),
                    choice("Trust the call because the face reacts naturally", "risk", -10, "Realistic media can still be synthetic."),
                    choice("Send money first because verification may waste critical minutes", "danger", -20, "That gives the scammer exactly what they want.")
                ]
            },
            {
                label:"Stage 4 - Payment Demand",
                title:"Emergency transfer request",
                text:"The account name does not match your cousin's name.",
                ui:paymentUI("Emergency Help", "Beneficiary: R K Services", "Rs 40,000", "Immediate transfer requested"),
                choices:[
                    choice("Pause when the beneficiary name does not match and verify on a known number", "safe", 10, "Known channels matter more than convincing media."),
                    choice("Send a smaller amount while continuing to verify", "risk", -10, "A smaller loss is still a loss and confirms you are willing to pay."),
                    choice("Transfer because emergencies often use someone else's account", "danger", -20, "Mismatched account names are a major warning sign.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:7,
        state:"Delhi",
        title:"Bank KYC Phishing",
        type:"Credential and OTP theft",
        interface:"Banking email and fake login page",
        summary:"A bank warning says your account will be frozen unless you update KYC through a link.",
        psychology:"Fear, urgency, authority bias",
        cyber:"Credential phishing, OTP theft, fake domains",
        safety:"Open the official banking app or website yourself. Never enter OTPs from a message link.",
        realCase:{
            state:"Delhi",
            year:"2025",
            impact:"Delhi Police arrested accused in a KYC phishing case where a victim lost over Rs 10 lakh after scammers extracted banking credentials through a fake KYC update flow.",
            sourceTitle:"The Indian Express: Delhi man loses Rs 10.8 lakh after bank KYC update scam",
            sourceUrl:"https://indianexpress.com/article/cities/delhi/delhi-man-loses-sbi-kyc-update-call-police-trace-scam-jharkhand-10101323/",
            tip:"Open your bank app directly; never update KYC from links sent by callers or messages."
        },
        stages:[
            {
                label:"Stage 1 - Bank Email",
                title:"KYC expires today",
                text:"The email says your account will be blocked within 30 minutes.",
                ui:emailUI("SBI Security Team", "kyc-alert@sbi-verify.net", "URGENT: KYC update required", "Dear customer, update KYC immediately to prevent account suspension."),
                choices:[
                    choice("Open the banking app yourself and check whether the same KYC alert exists", "safe", 10, "Direct access removes the malicious link."),
                    choice("Reply to the email asking for confirmation before clicking", "risk", -10, "Replies go to the attacker, not the bank."),
                    choice("Use the link after checking that the page visually matches your bank", "danger", -20, "The sender domain is not the bank's official domain.")
                ]
            },
            {
                label:"Stage 2 - Fake Login",
                title:"A familiar login page appears",
                text:"The page looks real, but the URL is misspelled and the lock icon is just an image.",
                ui:paymentUI("SBI Login", "Username and password", "Hidden", "URL: sbi-secure-kyc.in"),
                choices:[
                    choice("Close it and type the bank address manually in a new tab", "safe", 10, "Domain checking is essential."),
                    choice("Use an old password you no longer care about", "risk", -10, "Any password reuse can compromise other accounts."),
                    choice("Log in once to check whether the lock warning appears inside the account", "danger", -20, "This gives credentials to the attacker.")
                ]
            },
            {
                label:"Stage 3 - OTP Trap",
                title:"The page asks for OTP",
                text:"An OTP arrives saying do not share it with anyone, but the fake page says it is required.",
                ui:chatUI("Bank OTP", ["OTP 482911 for transaction of Rs 49,999.", "Do not share this code with anyone."]),
                choices:[
                    choice("Read the OTP message fully and compare the transaction purpose", "safe", 10, "Use the official number from your card or app."),
                    choice("Wait for a fresh OTP in case the first one was old", "risk", -10, "Waiting does not secure already-entered credentials."),
                    choice("Enter the OTP because the KYC page is already open", "danger", -20, "The OTP may approve a transaction or login.")
                ]
            },
            {
                label:"Stage 4 - Recovery",
                title:"You suspect compromise",
                text:"You may have entered your password before noticing the URL.",
                ui:portalUI("Recovery Checklist", [["Step 1", "Change password"], ["Step 2", "Block suspicious sessions"], ["Step 3", "Contact bank"], ["Step 4", "Monitor transactions"]]),
                choices:[
                    choice("Change the password from the official app and report the attempt", "safe", 10, "Good recovery action."),
                    choice("Delete the email so you do not click it again", "risk", -10, "Deleting evidence does not secure the account."),
                    choice("Wait for a transaction alert before taking action", "danger", -20, "Delay gives attackers more time.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:8,
        state:"Telangana",
        title:"UPI Collect Request Scam",
        type:"Refund fraud",
        interface:"Payment support chat and UPI request",
        summary:"A fake support agent claims you must approve a collect request to receive a refund.",
        psychology:"Reward, authority, time pressure",
        cyber:"UPI fraud, collect request abuse, payment manipulation",
        safety:"Receiving money does not require your UPI PIN. Decline unexpected collect requests.",
        realCase:{
            state:"Telangana / India",
            year:"2025",
            impact:"NPCI moved to stop person-to-person UPI collect requests after the feature was repeatedly misused by scammers to trick people into authorising payments.",
            sourceTitle:"Times of India: NPCI to end UPI P2P collect requests from October 1",
            sourceUrl:"https://timesofindia.indiatimes.com/business/india-business/upi-fraud-clampdown-npci-to-end-p2p-collect-requests-from-october-1-banks-apps-told-to-block-pull-transactions-permanently/articleshow/123309612.cms",
            tip:"Decline unexpected collect requests and read the payment screen before entering a UPI PIN."
        },
        stages:[
            {
                label:"Stage 1 - Refund Message",
                title:"Your refund is ready",
                text:"A support account says your order refund is pending and needs approval.",
                ui:chatUI("Payment Support", ["Refund of Rs 2,499 is ready.", "Approve the UPI request within 5 minutes.", "This is the final attempt."]),
                choices:[
                    choice("Check the refund status from the original order page before following chat instructions", "safe", 10, "Verify from the original platform."),
                    choice("Follow the chat steps but avoid sharing the PIN", "risk", -10, "Support chats can be fake or compromised."),
                    choice("Let the agent stay on chat while you follow the refund steps in UPI", "danger", -20, "UPI PIN must never be shared.")
                ]
            },
            {
                label:"Stage 2 - Collect Request",
                title:"Approve to receive money",
                text:"The UPI screen shows a collect request from refunddesk@upi.",
                ui:paymentUI("UPI Collect Request", "Paying to refunddesk@upi", "Rs 2,499", "Enter UPI PIN to approve"),
                choices:[
                    choice("Decline the request and check the refund only inside the original app", "safe", 10, "Refunds do not need collect approval."),
                    choice("Ask them to send a request for Rs 1 first as a test", "risk", -10, "Any amount approval can still be theft."),
                    choice("Approve because the amount shown matches the promised refund", "danger", -20, "Approving sends money from your account.")
                ]
            },
            {
                label:"Stage 3 - Pressure",
                title:"The agent becomes urgent",
                text:"They say the refund will be cancelled and your account blocked.",
                ui:govWarningUI("REFUND EXPIRING", "Approve now to avoid account lock.", "02:00"),
                choices:[
                    choice("Save evidence, report the handle inside the payment app, and block it", "safe", 10, "Reporting helps stop abuse."),
                    choice("Keep chatting to gather more proof before deciding", "risk", -10, "Take screenshots, but do not stay engaged."),
                    choice("Approve before expiry and dispute it later if needed", "danger", -20, "The timer is artificial pressure.")
                ]
            },
            {
                label:"Stage 4 - Safety Check",
                title:"What does UPI PIN mean?",
                text:"The app asks for your UPI PIN before completing the action.",
                ui:portalUI("UPI Rule", [["PIN required", "Money leaves your account"], ["Receiving money", "No PIN needed"], ["Collect request", "Usually a payment request"], ["Action", "Read screen carefully"]]),
                choices:[
                    choice("Stop when the app asks for a PIN and read what action is being approved", "safe", 10, "Exactly."),
                    choice("Ask the support agent to explain why a PIN is needed", "risk", -10, "The scammer will explain it falsely."),
                    choice("Enter the PIN because the screen says it will complete the refund flow", "danger", -20, "That belief is what scammers exploit.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:9,
        state:"West Bengal",
        title:"Parcel Delivery Phishing",
        type:"Address and card theft",
        interface:"Delivery email and payment page",
        summary:"A delivery notice asks you to pay a tiny redelivery fee through a fake courier website.",
        psychology:"Convenience pressure, small-fee bias, urgency",
        cyber:"Phishing, fake courier domains, card theft",
        safety:"Check tracking only through the courier's official website or the shopping app.",
        realCase:{
            state:"West Bengal / India",
            year:"2025",
            impact:"PIB warned citizens about fake India Post parcel messages that asked users to update address details through fraudulent links, a phishing pattern designed to steal personal and financial data.",
            sourceTitle:"Business Standard: PIB flags fake India Post parcel message scam",
            sourceUrl:"https://www.business-standard.com/finance/personal-finance/that-india-post-parcel-message-on-your-phone-it-s-a-scam-says-pib-125101300283_1.html",
            tip:"Track parcels only through official courier websites or shopping apps, not SMS links."
        },
        stages:[
            {
                label:"Stage 1 - Delivery Notice",
                title:"Package on hold",
                text:"A message says your address is incomplete and the parcel will be returned tonight.",
                ui:emailUI("Express Parcel Support", "delivery-update@fastparcel-track.in", "Package on hold", "Confirm your address and pay Rs 19 redelivery fee before midnight."),
                choices:[
                    choice("Check the order status from the shopping app or courier site you open yourself", "safe", 10, "Real delivery issues appear in the official order page."),
                    choice("Forward the link to a friend and ask if it looks real", "risk", -10, "Forwarding can spread malicious links."),
                    choice("Use the link since it only asks for a small redelivery fee", "danger", -20, "The domain is suspicious and the fee is bait.")
                ]
            },
            {
                label:"Stage 2 - Address Form",
                title:"The form asks for too much",
                text:"It asks for your full address, card details, and OTP for a Rs 19 fee.",
                ui:paymentUI("Courier Redelivery", "Fee payment", "Rs 19", "Card, CVV, OTP required"),
                choices:[
                    choice("Close the page and report the message from the courier app or email client", "safe", 10, "Tiny fees can hide major card theft."),
                    choice("Enter only the address and stop before payment", "risk", -10, "Address data can still be abused."),
                    choice("Pay the Rs 19 fee with a card that has transaction alerts enabled", "danger", -20, "The attacker can use those details for larger transactions.")
                ]
            },
            {
                label:"Stage 3 - Fake Tracking",
                title:"Tracking ID not found elsewhere",
                text:"The tracking number works only on the suspicious website.",
                ui:portalUI("Tracking Check", [["Suspicious site", "Shows parcel"], ["Official courier", "Not found"], ["Shopping app", "No such order"], ["Risk", "High"]]),
                choices:[
                    choice("Rely on the courier or shopping app you opened independently", "safe", 10, "Independent sources matter."),
                    choice("Wait until evening and try the same link again", "risk", -10, "The link remains unsafe later."),
                    choice("Use the tracking page because it shows a complete delivery timeline", "danger", -20, "Scammers control their own fake tracking page.")
                ]
            },
            {
                label:"Stage 4 - Final Action",
                title:"You almost paid",
                text:"The payment page is still open and the timer says three minutes left.",
                ui:govWarningUI("ADDRESS CONFIRMATION EXPIRING", "Pay redelivery fee now.", "03:00"),
                choices:[
                    choice("Save evidence, close the page, and avoid the message link", "safe", 10, "Good."),
                    choice("Leave the tab open while deciding later", "risk", -10, "Preserve evidence, then close the unsafe page."),
                    choice("Pay to prevent return-to-sender and dispute it later if needed", "danger", -20, "The small amount is bait for card theft.")
                ]
            },
            learningStage()
        ]
    },
    {
        id:10,
        state:"Punjab",
        title:"Fake Recruitment Scam",
        type:"Employment fraud and identity theft",
        interface:"Job selection email, HR chat, onboarding portal, processing fee",
        summary:"A professional-looking recruiter offers a high salary, skips the normal interview process, and asks for documents plus a processing fee.",
        psychology:"Career anxiety, excitement, urgency, authority trust, fear of missing opportunity",
        cyber:"Recruitment fraud, identity theft, fake onboarding portals, document misuse",
        safety:"Legitimate employers do not demand urgent processing fees or sensitive documents through unverified links before proper hiring verification.",
        realCase:{
            state:"Punjab",
            year:"2025",
            impact:"Punjab School Education Board warned job seekers about a fake recruitment advertisement circulating online with a high salary claim and no exam, urging people not to share personal data or make payments.",
            sourceTitle:"The Indian Express: Fake recruitment alert at Punjab School Education Board",
            sourceUrl:"https://indianexpress.com/article/cities/chandigarh/fake-recruitment-punjab-education-board-viral-post-10064746/lite/",
            tip:"Verify job notices only through official company or government websites before sharing documents."
        },
        stages:[
            {
                label:"Stage 1 - Job Selection Email",
                title:"Congratulations, you have been shortlisted",
                text:"The email uses polished branding, promises a high salary, and says the company is skipping the final interview because your profile is already approved.",
                ui:emailUI("NorthStar Careers", "hr@northstar-careers.co.in", "Shortlisted for immediate joining", "Your profile has been selected for a work-from-home operations role. Confirm within 2 hours to receive your offer letter and onboarding link."),
                choices:[
                    choice("Compare the email domain, company site, and original job posting before responding", "safe", 10, "Hiring processes leave verifiable traces across official sites and recruiter profiles."),
                    choice("Reply with interest but avoid opening the onboarding link yet", "risk", -10, "Engaging keeps the scam alive, even if you have not shared documents yet."),
                    choice("Open the onboarding link because the offer letter appears attached", "danger", -20, "Fake offer letters and links are used to pull job seekers into document theft.")
                ]
            },
            {
                label:"Stage 2 - HR Interaction",
                title:"Complete verification quickly",
                text:"A fake HR representative says your position is reserved but asks for Aadhaar, PAN, resume, and bank details to activate payroll.",
                ui:chatUI("HR - NorthStar Careers", ["Congratulations, you are almost selected.", "Upload Aadhaar, PAN, resume and bank details today.", "Verification must finish before the batch closes."]),
                choices:[
                    choice("Ask for an official company email thread and verify HR through the company website", "safe", 10, "Sensitive documents should only be shared after the employer and process are independently verified."),
                    choice("Share only your resume while holding Aadhaar and PAN for later", "risk", -10, "A resume still contains personal data that can support future targeting."),
                    choice("Upload Aadhaar, PAN and bank details to secure the role", "danger", -20, "These documents can be misused for identity fraud, fake accounts, and financial crime.")
                ]
            },
            {
                label:"Stage 3 - Verification Fee",
                title:"Processing fee required",
                text:"The portal says Rs 2,500 is needed for background verification. Fake employee testimonials claim the fee was refunded after joining.",
                ui:paymentUI("Recruitment Portal", "Processing fee", "Rs 2,500", "Slot expires in 30 minutes"),
                choices:[
                    choice("Refuse payment and verify the company through independent sources", "safe", 10, "Legitimate employers do not charge candidates urgent processing fees to release jobs."),
                    choice("Ask if the fee can be deducted from your first salary", "risk", -10, "Negotiating keeps you inside the scammer's pressure frame."),
                    choice("Pay the fee because the role and salary seem worth it", "danger", -20, "Recruitment scams often start with small fees and escalate to more demands.")
                ]
            },
            {
                label:"Stage 4 - Final Hiring Pressure",
                title:"Your slot expires in 30 minutes",
                text:"The HR account sends fake employee testimonials and says candidates who delay will be moved to next month.",
                ui:portalUI("Offer Verification", [["Salary", "Rs 82,000/month"], ["Interview", "Skipped"], ["Documents", "Aadhaar, PAN, bank required"], ["Fee", "Rs 2,500 urgent"]]),
                choices:[
                    choice("Verify the company, recruiter, and hiring process before sharing anything else", "safe", 10, "Independent verification protects both your money and your identity documents."),
                    choice("Share documents but avoid the payment until you receive more proof", "risk", -10, "Avoiding payment helps, but document exposure can still cause identity theft."),
                    choice("Pay the fee and upload documents before the slot expires", "danger", -20, "The scammer now has both money and personal information for future fraud.")
                ]
            },
            learningStage()
        ]
    }
];

let profile = loadProfile();
let activeStage = 0;
let feedbackLocked = false;
let achievementQueue = [];

function phoneUI(name, number, note){
    return `<div class="phone-ui"><div class="caller-ring">CALL</div><h3>${name}</h3><p class="phone-number">${number}</p><p class="stage-text">${note}</p><div class="phone-actions"><button class="call-btn call-red">X</button><button class="call-btn call-green">OK</button></div></div>`;
}

function docsUI(items){
    return `<div class="doc-list">${items.map(item => `<div class="fake-doc"><h4>Confidential Document</h4><p>${item}</p></div>`).join("")}</div>`;
}

function govWarningUI(title, message, timer){
    return `<div class="gov-ui"><div class="gov-top"><b>${title}</b><span>HIGH PRIORITY</span></div><div class="gov-screen"><div class="warning-banner">${message}</div><div class="countdown">${timer}</div></div></div>`;
}

function paymentUI(title, label, amount, note){
    return `<div class="payment-ui"><div class="payment-top"><b>${title}</b><span>Payment Screen</span></div><div class="payment-body"><div class="upi-box"><p>${label}</p><div class="upi-amount">${amount}</div><p>${note}</p></div></div></div>`;
}

function portalUI(title, rows){
    return `<div class="portal-ui"><div class="portal-top"><b>${title}</b><span>Secure Console</span></div><div class="portal-screen"><div class="grid-two">${rows.map(row => `<div class="metric"><b>${row[0]}</b><span>${row[1]}</span></div>`).join("")}</div></div></div>`;
}

function chatUI(name, messages){
    return `<div class="chat-ui"><div class="chat-top"><b>${name}</b><span>online</span></div><div class="chat-body">${messages.map((message, index) => `<div class="bubble ${index === 1 ? "self" : ""}">${message}</div>`).join("")}</div></div>`;
}

function tradingUI(app, amount, bars){
    return `<div class="trading-ui"><div class="trading-top"><b>${app}</b><span>Live Profit</span></div><div class="trading-screen"><p>Portfolio value</p><div class="profit">${amount}</div><div class="chart-bars">${bars.map(height => `<span style="height:${height}%"></span>`).join("")}</div></div></div>`;
}

function popupUI(title, message){
    return `<div class="popup-ui"><div class="popup-warning"><h3>${title}</h3><p>${message}</p><div class="nav-actions"><button class="danger-btn">Call Support</button><button class="primary-btn">Scan Now</button></div></div></div>`;
}

function emailUI(sender, email, subject, body){
    return `<div class="email-ui"><div class="email-top"><b>${sender}</b><span>${email}</span></div><div class="email-subject">${subject}</div><div class="email-body">${body}<br><span class="fake-link-btn">Continue</span></div></div>`;
}

function videoUI(name, detail, signal){
    return `<div class="video-ui"><div class="video-grid"><div class="video-tile"><div><div class="face-circle"></div><b>${name}</b><p>${detail}</p></div></div><div class="video-tile"><div><div class="face-circle"></div><b>You</b><p>${signal}</p></div></div></div></div>`;
}

function hotelUI(name, headline, note){
    return `<div class="hotel-ui"><div class="hotel-hero"><div><h3>${name}</h3><p>${headline}</p></div></div><div class="hotel-body"><div class="warning-banner">${note}</div><div class="grid-two"><div class="metric"><b>Rating</b><span>5.0 from 1,842 reviews</span></div><div class="metric"><b>Offer</b><span>Expires tonight</span></div></div></div></div>`;
}

function choice(text, severity, score, result){
    const normalizedScore = severity === "safe" ? score : severity === "risk" ? -5 : -10;
    return {text, severity, score:normalizedScore, result};
}

function learningStage(){
    return {label:"Stage 5 - Outcome", title:"Outcome and learning", learning:true};
}

function loadProfile(){
    try{
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return saved ? {
            ...defaultProfile,
            ...saved,
            riskFlags:{...defaultProfile.riskFlags, ...(saved.riskFlags || {})},
            patternCounts:{...defaultProfile.patternCounts, ...(saved.patternCounts || {})}
        } : {...defaultProfile};
    }catch(error){
        return {...defaultProfile};
    }
}

function saveProfile(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function startProfile(event){
    event.preventDefault();
    const name = document.getElementById("playerName").value.trim();
    if(!name) return;
    profile = {...defaultProfile, name};
    saveProfile();
    renderApp();
}

function resetProfile(){
    localStorage.removeItem(STORAGE_KEY);
    profile = {...defaultProfile};
    activeStage = 0;
    renderApp();
}

function selectLevel(id){
    closeDrawer();
    profile.activeLevel = id;
    profile.viewFinal = false;
    activeStage = 0;
    feedbackLocked = false;
    saveProfile();
    renderApp();

    const mainEl = document.getElementById("mainContent");
    if(mainEl){
        mainEl.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function getRank(){
    return getEnding().title;
}

function threatLabel(){
    if(profile.threat >= 70) return {label:"High", color:"var(--red)", width:"100%"};
    if(profile.threat >= 35) return {label:"Medium", color:"var(--yellow)", width:"62%"};
    return {label:"Low", color:"var(--green)", width:"22%"};
}

function getThreatBand(){
    if(profile.threat >= 70) return "high";
    if(profile.threat >= 35) return "medium";
    return "low";
}

function getEnding(){
    const safeMajority = profile.safeDecisions >= profile.riskyDecisions + profile.dangerousDecisions;
    const band = getThreatBand();
    const majorCompromise = profile.riskFlags.bankCompromised || profile.riskFlags.remoteAccessInstalled || profile.riskFlags.malwareExposure;
    if(profile.score > 90 && safeMajority && band === "low"){
        return {
            title:"Cyber Guardian",
            badge:"Cyber Guardian Badge",
            tone:"guardian",
            message:"You successfully identified psychological manipulation tactics and protected yourself from cyber threats. Your decision-making remained calm under pressure."
        };
    }
    if(profile.score < 40 || (profile.dangerousDecisions >= 8 && band === "high" && majorCompromise)){
        return {
            title:"System Compromised",
            badge:"Scam Magnet Badge",
            tone:"compromised",
            message:"Your accounts, financial information, and personal identity became compromised due to repeated unsafe decisions and emotional reactions."
        };
    }
    if(profile.score >= 70 && profile.score <= 89){
        return {
            title:"Security Aware",
            badge:"Security Aware Badge",
            tone:"aware",
            message:"You avoided major scams but showed vulnerability during emotionally stressful situations. More awareness is needed during urgent interactions."
        };
    }
    if(profile.score >= 40){
        return {
            title:"Vulnerable User",
            badge:"Vulnerable User Badge",
            tone:"vulnerable",
            message:"You were repeatedly influenced by urgency, fear, and social pressure. Cybercriminals often target users with impulsive decision-making patterns."
        };
    }
    return {
        title:"System Compromised",
        badge:"Scam Magnet Badge",
        tone:"compromised",
        message:"Your accounts, financial information, and personal identity became compromised due to repeated unsafe decisions and emotional reactions."
    };
}

function getPsychProfile(){
    const patterns = profile.patternCounts;
    const highest = Math.max(patterns.fear, patterns.greed, patterns.trust, patterns.convenience);
    if(profile.safeDecisions >= profile.riskyDecisions + profile.dangerousDecisions && patterns.verification >= 10){
        return {
            title:"High Cyber Awareness",
            text:"You consistently used verification and rational analysis before taking action."
        };
    }
    if(highest === patterns.fear){
        return {
            title:"Fear Sensitive",
            text:"You frequently reacted emotionally during authority-based threats and urgent warnings."
        };
    }
    if(highest === patterns.greed){
        return {
            title:"Greed Vulnerable",
            text:"You showed high susceptibility to reward-based investment scams and financial temptation."
        };
    }
    if(highest === patterns.trust){
        return {
            title:"Trust-Based Vulnerability",
            text:"You relied heavily on familiarity and emotional trust during impersonation attacks."
        };
    }
    return {
        title:"Convenience Driven",
        text:"You often chose the quickest path under pressure, even when the situation needed independent verification."
    };
}

function getLevelDecisions(levelId){
    return profile.decisionHistory.filter(item => item.levelId === levelId);
}

function getLevelSummary(levelId){
    const decisions = getLevelDecisions(levelId);
    const safe = decisions.filter(item => item.severity === "safe").length;
    const risky = decisions.filter(item => item.severity === "risk").length;
    const dangerous = decisions.filter(item => item.severity === "danger").length;
    const score = decisions.reduce((total, item) => {
        const level = levels[item.levelId - 1];
        const stage = level.stages[item.stageIndex];
        const match = stage.choices.find(choiceItem => choiceItem.text === item.text);
        return total + (match ? match.score : 0);
    }, 0);
    return {safe, risky, dangerous, score};
}

function getLevelProfile(levelId){
    const summary = getLevelSummary(levelId);
    if(summary.dangerous >= 2){
        return {
            title:"Compromised",
            text:"This case exposed a strong vulnerability pattern. The scammer gained several chances to deepen control."
        };
    }
    if(summary.risky >= 2 || summary.dangerous === 1){
        return {
            title:"Partially Exposed",
            text:"You avoided the worst outcome, but the scam still found openings through hesitation or incomplete verification."
        };
    }
    return {
        title:"Well Defended",
        text:"You kept control of the interaction and relied on verification instead of pressure."
    };
}

function getLevelIncidentNotes(levelId){
    const notes = [];
    const levelHadDanger = getLevelDecisions(levelId).some(item => item.severity === "danger");
    if(levelId === 1 && levelHadDanger) notes.push("Identity data was exposed and may fuel later impersonation attempts.");
    if(levelId === 2 && levelHadDanger) notes.push("Utility-account details were exposed and may attract follow-up bill scams.");
    if(levelId === 3 && levelHadDanger) notes.push("The fake trading funnel now knows you may respond to profit-based offers.");
    if(levelId === 4 && levelHadDanger) notes.push("Remote access exposure can create follow-on device and banking risks.");
    if(levelId === 5 && levelHadDanger) notes.push("A marketplace UPI decision may have exposed your payment account to further fraud attempts.");
    if(levelId === 7 && levelHadDanger) notes.push("Banking or UPI access may now be available to attackers.");
    if(levelId === 10 && levelHadDanger) notes.push("Recruitment documents may now be available for identity misuse.");
    return notes;
}

function renderLogin(){
    document.getElementById("root").innerHTML = `
        <div class="login-screen">
            <form class="login-card" onsubmit="startProfile(event)">
                <h1>ThreatSim</h1>
                <p>Enter the simulator as a cyber-awareness trainee. Your score, unlocked levels, and completed cases will be saved in this browser.</p>
                <label class="field-label" for="playerName">Player name</label>
                <input class="name-input" id="playerName" maxlength="24" placeholder="Enter your name" autocomplete="off">
                <button class="primary-btn" type="submit">Start Simulation</button>
            </form>
        </div>
    `;
}

function toggleDrawer(){
    const sidebar = document.getElementById("mainSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if(!sidebar || !overlay) return;
    if(sidebar.classList.contains("open")){
        closeDrawer();
    } else {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    }
}

function closeDrawer(){
    const sidebar = document.getElementById("mainSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if(sidebar) sidebar.classList.remove("open");
    if(overlay) overlay.classList.remove("active");
}

function renderApp(){
    if(!profile.name){
        renderLogin();
        return;
    }

    const threat = threatLabel();
    document.getElementById("root").innerHTML = `
        <div class="app">
            <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeDrawer()"></div>
            <aside class="sidebar" id="mainSidebar">
                <div class="sidebar-header">
                    <div class="brand">
                        <h1>ThreatSim</h1>
                        <p>Interactive Cybercrime Awareness Simulator</p>
                    </div>
                    <button type="button" class="drawer-close-btn" onclick="closeDrawer()">✕</button>
                </div>

                <div class="profile-card">
                    <h3>Player Profile</h3>
                    <p>Name: ${profile.name}</p>
                    <p>Role: Cyber Awareness Trainee</p>
                    <p>Security Score</p>
                    <div class="score-value">${profile.score}</div>
                </div>

                <div class="meter-card">
                    <h3>Threat Meter</h3>
                    <div class="meter-track"><div class="meter-fill" style="width:${threat.width}; background:${threat.color}"></div></div>
                    <p class="meter-status" style="color:${threat.color}">${threat.label}</p>
                </div>

                <h3 class="levels-title">Levels</h3>
                <div class="level-list">
                    ${levels.map(level => levelButton(level)).join("")}
                </div>

                <div class="sidebar-actions">
                    
                    <button type="button" class="ghost-btn" onclick="showFinal()">Final Report</button>
                    <button type="button" class="danger-btn" onclick="resetProfile()">Reset Progress</button>
                </div>
            </aside>

            <main class="main" id="mainContent">
                <div class="mobile-topbar">
                    <button type="button" class="hamburger-btn" onclick="toggleDrawer()">☰</button>
                    <span class="mobile-brand">ThreatSim</span>
                    <div class="mobile-score-pill" id="mobileScorePill">⚡ ${profile.score}</div>
                </div>
                ${profile.viewFinal ? finalReportMarkup() : simulationMarkup()}
            </main>
        </div>
        
    `;
}

function levelButton(level){
    const completed = profile.completedLevels.includes(level.id);
    const locked = false;;
    const active = level.id === profile.activeLevel;
    const icon = completed ? "✅" : locked ? "🔒" : "🔓";
    return `<button type="button" class="level-item ${completed ? "completed" : ""} ${locked ? "locked" : ""} ${active ? "active" : ""}" onclick="selectLevel(${level.id})">
        ${icon} Level ${level.id}: ${level.state}
        <span>${level.title}</span>
    </button>`;
}

function simulationMarkup(){
    const level = levels[profile.activeLevel - 1];
    

    const stage = level.stages[activeStage];
    return `
        <div class="topbar">
            <div>
                <h2>Interactive Cyber Simulation</h2>
                <p>Walk through each scam as it escalates. Your choices affect score, threat, and unlocked levels.</p>
            </div>
            <div class="status-pill">Level ${level.id} / ${levels.length}</div>
        </div>

        <section class="sim-card stage-fade">
            <div class="case-header">
                <div>
                    <h3>${level.state}: ${level.title}</h3>
                    <p>${level.summary}</p>
                    <div class="case-meta">
                        <span class="tag">${level.type}</span>
                        <span class="tag">${level.interface}</span>
                    </div>
                </div>
            </div>

            <div class="stage-nav">
                ${level.stages.map((_, index) => `<div class="stage-dot ${index < activeStage ? "done" : ""} ${index === activeStage ? "active" : ""}"></div>`).join("")}
            </div>

            <div class="stage-body">
                ${stage.learning ? learningMarkup(level) : stageMarkup(stage)}
            </div>
        </section>
    `;
}

function stageMarkup(stage){
    return `
        <div class="stage-kicker">${stage.label}</div>
        <h3 class="stage-title">${stage.title}</h3>
        <div class="interface-wrap">${stage.ui}</div>
        <p class="stage-text">${stage.text}</p>
        <div class="choices">
            ${stage.choices.map((item, index) => `<button type="button" class="choice" onclick="chooseAction(${index})">${item.text}</button>`).join("")}
        </div>
        <div id="feedback" class="feedback"></div>
    `;
}

function chooseAction(index){
    if(feedbackLocked) return;
    const level = levels[profile.activeLevel - 1];
    const stage = level.stages[activeStage];
    const selected = stage.choices[index];
    profile.score = Math.max(0, profile.score + selected.score);
    recordDecision(level.id, activeStage, selected);
    if(selected.score < 0){
        profile.threat = Math.min(100, profile.threat + Math.abs(selected.score));
    }else{
        profile.threat = Math.max(0, profile.threat - 5);
    }
    feedbackLocked = true;
    checkAchievements();
    saveProfile();

    const feedback = document.getElementById("feedback");
    const color = selected.severity === "safe" ? "var(--green)" : selected.severity === "risk" ? "var(--yellow)" : "var(--red)";
    const verdict = selected.severity === "safe" ? "Correct Decision" : selected.severity === "risk" ? "Risky Decision" : "Wrong Decision";
    const pointsText = selected.score > 0 ? `+${selected.score} points` : `${selected.score} points`;
    feedback.style.borderLeftColor = color;
    feedback.classList.add("show");
    feedback.innerHTML = `
        <div class="feedback-head">
            <h3 style="color:${color}">${verdict}</h3>
            <span style="color:${color}">${pointsText}</span>
        </div>
        <p>${selected.result}</p>
        <div class="nav-actions">
            <button type="button" class="primary-btn" onclick="nextStage()">Continue</button>
        </div>
    `;
    updateSidebarStats();
    showNextAchievement();
    feedback.scrollIntoView({behavior:"smooth", block:"center"});
}

function recordDecision(levelId, stageIndex, selected){
    profile.decisionHistory.push({
        levelId,
        stageIndex,
        severity:selected.severity,
        text:selected.text
    });

    if(selected.severity === "safe"){
        profile.safeDecisions++;
        profile.patternCounts.verification++;
    }else if(selected.severity === "risk"){
        profile.riskyDecisions++;
    }else{
        profile.dangerousDecisions++;
    }

    if(selected.severity !== "safe"){
        const pattern = getPatternForLevel(levelId);
        profile.patternCounts[pattern]++;
    }

    applyRiskFlags(levelId, stageIndex, selected);
}

function getPatternForLevel(levelId){
    if([1,2,4,7,9].includes(levelId)) return "fear";
    if([3,5].includes(levelId)) return "greed";
    if(levelId === 6) return "trust";
    return "convenience";
}

function applyRiskFlags(levelId, stageIndex, selected){
    if(selected.severity === "safe") return;

    if(levelId === 1 && selected.severity === "danger"){
        profile.riskFlags.identityExposed = true;
    }
    if(levelId === 2 && selected.severity === "danger"){
        profile.riskFlags.utilityDataShared = true;
    }
    if(levelId === 3 && selected.severity === "danger"){
        profile.riskFlags.investmentTargeted = true;
    }
    if(levelId === 4 && selected.severity === "danger"){
        profile.riskFlags.remoteAccessInstalled = true;
    }
    if(levelId === 5 && selected.severity === "danger"){
        profile.riskFlags.bankCompromised = true;
    }
    if(levelId === 7 && selected.severity === "danger"){
        profile.riskFlags.bankCompromised = true;
    }
    if(levelId === 10 && selected.severity === "danger"){
        profile.riskFlags.identityExposed = true;
    }
}

function consequenceMarkup(levelId){
    const events = [];
    if(levelId >= 3 && profile.riskFlags.identityExposed){
        events.push("New incident: unknown logins are attempting identity verification using personal details you previously exposed.");
    }
    if(levelId >= 4 && profile.riskFlags.utilityDataShared){
        events.push("New targeting signal: additional utility and bill-payment messages are arriving after earlier account details were shared.");
    }
    if(levelId >= 5 && profile.riskFlags.investmentTargeted){
        events.push("New incident: repeated calls now claim you owe tax on profits shown in the earlier trading app.");
    }
    if(levelId >= 6 && profile.riskFlags.remoteAccessInstalled){
        events.push("Device warning: a remote-access service is still requesting screen permissions in the background.");
    }
    if(levelId >= 6 && profile.riskFlags.bankCompromised){
        events.push("Payment alert: suspicious UPI and bank activity is appearing after earlier payment exposure.");
    }
    if(levelId >= 10 && profile.riskFlags.malwareExposure){
        events.push("Security warning: a downloaded document is trying to read browser and notification data.");
    }

    const freshEvents = events.filter(event => !profile.consequenceHistory.includes(event));
    if(freshEvents.length){
        profile.consequenceHistory.push(...freshEvents);
        saveProfile();
    }

    if(!events.length) return "";
    return `
        <div class="incident-panel">
            <h4>Ongoing Incident Chain</h4>
            ${events.map(event => `<p>${event}</p>`).join("")}
        </div>
    `;
}

function updateSidebarStats(){
    const threat = threatLabel();
    const scoreEl = document.querySelector(".score-value");
    const fill = document.querySelector(".meter-fill");
    const status = document.querySelector(".meter-status");
    const mobilePill = document.getElementById("mobileScorePill");
    if(scoreEl) scoreEl.textContent = profile.score;
    if(fill){
        fill.style.width = threat.width;
        fill.style.background = threat.color;
    }
    if(status){
        status.textContent = threat.label;
        status.style.color = threat.color;
    }
    if(mobilePill) mobilePill.textContent = `⚡ ${profile.score}`;
}

const achievementDefinitions = [
    {
        id:"scam-detector",
        title:"Scam Detector",
        test:() => profile.safeDecisions >= 3
    },
    {
        id:"critical-thinker",
        title:"Critical Thinker",
        test:() => profile.patternCounts.verification >= 6
    },
    {
        id:"privacy-protector",
        title:"Privacy Protector",
        test:() => profile.completedLevels.length >= 3 && !profile.riskFlags.identityExposed && !profile.riskFlags.bankCompromised
    },
    {
        id:"risk-taker",
        title:"Risk Taker",
        test:() => profile.riskyDecisions >= 5
    },
    {
        id:"manipulated-user",
        title:"Manipulated User",
        test:() => profile.dangerousDecisions >= 5
    },
    {
        id:"investigator",
        title:"Investigator",
        test:() => profile.patternCounts.verification >= 10
    }
];

function checkAchievements(){
    achievementDefinitions.forEach(achievement => {
        if(!profile.achievements.includes(achievement.id) && achievement.test()){
            profile.achievements.push(achievement.id);
            achievementQueue.push(achievement.title);
        }
    });
}

function showNextAchievement(){
    if(!achievementQueue.length) return;
    const title = achievementQueue.shift();
    const existing = document.querySelector(".achievement-popup");
    if(existing) existing.remove();
    const popup = document.createElement("div");
    popup.className = "achievement-popup";
    popup.innerHTML = `<span>Achievement Unlocked</span><b>${title}</b>`;
    document.body.appendChild(popup);
    playAchievementSound();
    setTimeout(() => popup.classList.add("show"), 20);
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 250);
    }, 2800);
}

function playAchievementSound(){
    try{
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if(!AudioContextClass) return;
        const context = new AudioContextClass();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(520, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.22);
        gain.gain.setValueAtTime(0.0001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.28);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.3);
    }catch(error){
        return;
    }
}

function nextStage(){
    const level = levels[profile.activeLevel - 1];
    if(activeStage < level.stages.length - 1){
        activeStage++;
        feedbackLocked = false;
        renderApp();
        const mainEl = document.getElementById("mainContent");
        if(mainEl) mainEl.scrollTo({top:0, behavior:"smooth"});
        window.scrollTo({top:0, behavior:"smooth"});
    }
}

function learningMarkup(level){
    const summary = getLevelSummary(level.id);
    const localProfile = getLevelProfile(level.id);
    const incidentNotes = getLevelIncidentNotes(level.id);
    const incidentChain = consequenceMarkup(level.id);
    return `
        <div class="stage-kicker">Stage 5 - Outcome and Learning</div>
        <h3 class="stage-title">Level Report: ${level.title}</h3>
        <p class="stage-text">This case report summarizes how you handled the scam before the next level unlocks.</p>
        <div class="level-report-grid">
            <div class="report-box">
                <h3>Decision Summary</h3>
                <p>Safe: <b>${summary.safe}</b></p>
                <p>Risky: <b>${summary.risky}</b></p>
                <p>Dangerous: <b>${summary.dangerous}</b></p>
                <p>Level score change: <b>${summary.score >= 0 ? "+" : ""}${summary.score}</b></p>
            </div>
            <div class="report-box">
                <h3>Level Profile</h3>
                <h4>${localProfile.title}</h4>
                <p>${localProfile.text}</p>
            </div>
            <div class="report-box">
                <h3>Incident Impact</h3>
                ${incidentNotes.length ? incidentNotes.map(note => `<p>${note}</p>`).join("") : "<p>No persistent compromise was created in this level.</p>"}
            </div>
        </div>
        <div class="learn-grid">
            <div class="learn-box">
                <h4>Psychology Behind the Attack</h4>
                <p>${level.psychology}</p>
            </div>
            <div class="learn-box">
                <h4>Cybersecurity Concept</h4>
                <p>${level.cyber}</p>
            </div>
            <div class="learn-box">
                <h4>Real-world Safety Lesson</h4>
                <p>${level.safety}</p>
            </div>
        </div>
        ${incidentChain}
        ${realCaseMarkup(level.realCase)}
        <div class="nav-actions">
            <button type="button" class="primary-btn" onclick="completeLevel()">Continue</button>
        </div>
    `;
}

function realCaseMarkup(realCase){
    if(!realCase) return "";
    return `
        <div class="real-case-card">
            <div class="real-case-top">
                <h3>Reality Check</h3>
                <span>${realCase.state} • ${realCase.year}</span>
            </div>
            <p>${realCase.impact}</p>
            <a href="${realCase.sourceUrl}" target="_blank" rel="noopener noreferrer">
                ${realCase.sourceTitle} →
            </a>
            <div class="safety-tip">
                <b>Safety Awareness Tip</b>
                <span>${realCase.tip}</span>
            </div>
        </div>
    `;
}

function completeLevel(){
    if(profile.score <= 20){
        activeStage = 0;
        feedbackLocked = false;
        profile.viewFinal = false;
        saveProfile();
        renderApp();
        showRetryNotice();
        const mainEl = document.getElementById("mainContent");
        if(mainEl) mainEl.scrollTo({top:0, behavior:"smooth"});
        window.scrollTo({top:0, behavior:"smooth"});
        return;
    }

    if(!profile.completedLevels.includes(profile.activeLevel)){
        profile.completedLevels.push(profile.activeLevel);
    }
    if(profile.unlockedLevel < levels.length){
        profile.unlockedLevel = Math.max(profile.unlockedLevel, profile.activeLevel + 1);
        profile.activeLevel = profile.unlockedLevel;
        activeStage = 0;
        profile.viewFinal = false;
    }else{
        profile.viewFinal = true;
    }
    saveProfile();
    checkAchievements();
    renderApp();
    showNextAchievement();
    const mainEl = document.getElementById("mainContent");
    if(mainEl) mainEl.scrollTo({top:0, behavior:"smooth"});
    window.scrollTo({top:0, behavior:"smooth"});
}

function showRetryNotice(){
    const existing = document.querySelector(".retry-popup");
    if(existing) existing.remove();
    const popup = document.createElement("div");
    popup.className = "retry-popup show";
    popup.innerHTML = `
        <span>Level Locked</span>
        <b>Score must be above 20 to unlock the next level.</b>
        <p>Redo this level and make safer decisions to continue.</p>
    `;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 250);
    }, 3200);
}

function finalReportMarkup(){
    const ending = getEnding();
    const psychProfile = getPsychProfile();
    const unlockedBadges = achievementDefinitions
        .filter(item => profile.achievements.includes(item.id))
        .map(item => `<span class="badge-chip">${item.title}</span>`)
        .join("");
    return `
        <div class="final-view ${ending.tone}">
            <h2>Simulation Complete</h2>
            <div class="rank">${ending.title}</div>
            <p class="ending-message">${ending.message}</p>
            <div class="reward-badge">${ending.badge}</div>
            <p>Final Security Score: <b>${profile.score}</b></p>
            <p>Completed Levels: <b>${profile.completedLevels.length}/${levels.length}</b></p>
            <div class="report-grid">
                <div class="report-box">
                    <h3>Decision Pattern</h3>
                    <p>Safe: <b>${profile.safeDecisions}</b></p>
                    <p>Risky: <b>${profile.riskyDecisions}</b></p>
                    <p>Dangerous: <b>${profile.dangerousDecisions}</b></p>
                </div>
                <div class="report-box">
                    <h3>Psychological Profile</h3>
                    <h4>${psychProfile.title}</h4>
                    <p>${psychProfile.text}</p>
                </div>
                <div class="report-box">
                    <h3>Threat History</h3>
                    <p>Current threat level: <b>${threatLabel().label}</b></p>
                    <p>Incident flags triggered: <b>${Object.values(profile.riskFlags).filter(Boolean).length}</b></p>
                </div>
            </div>
            <div class="achievement-list">
                <h3>Achievements</h3>
                ${unlockedBadges || "<p>No achievements unlocked yet.</p>"}
            </div>
        </div>
    `;
}

function showFinal(){
    profile.viewFinal = true;
    saveProfile();
    renderApp();
}
// ====================== SENTINEL AI MENTOR - FULLY EXPANDED (Levels 1-10) ======================

const mentorResponses = {
    1: { // Digital Arrest Scam
        0: { // Stage 1 - Incoming Call
            safe: "Excellent. Always verify official threats independently instead of staying on the call.",
            risk: "Answering unknown 'Cyber Cell' calls gives them immediate psychological control.",
            danger: "Even partial identity confirmation helps them personalize and escalate the scam."
        },
        1: { // Stage 2 - Fake Documents
            safe: "Perfect response. Never trust documents sent during the call — verify externally.",
            risk: "Analyzing fake documents while they wait still keeps you in their frame.",
            danger: "Sending any photo or ID gives them real material for identity theft."
        },
        2: { // Stage 3 - Surveillance Threat
            safe: "Very good. Involving others breaks the isolation tactic they rely on.",
            risk: "Moving to another room is exactly what they want — total isolation.",
            danger: "Screen sharing can expose OTPs, banking apps, and personal files."
        },
        3: { // Stage 4 - Money Demand
            safe: "Correct. No government agency demands money over video calls.",
            risk: "Staying on the call keeps you trapped under pressure.",
            danger: "Any transfer, even 'small' or 'refundable', confirms you're a target."
        }
    },
    2: { // Water Bill Scam
        0: { 
            safe: "Smart move. Always check your official bill or portal before reacting to WhatsApp alerts.",
            risk: "Calling the number in the message puts you directly in the scammer's channel.",
            danger: "Confirming account details helps them build credibility for later stages."
        },
        1: {
            safe: "Good. Moving verification to the official portal removes their payment link.",
            danger: "Even small payments are often used to capture UPI or card details."
        },
        2: {
            safe: "Correct. Never install APKs from messages — use only official app stores.",
            danger: "Installing unknown APKs can lead to full device compromise."
        },
        3: {
            safe: "Excellent. Always verify utility issues using official customer care numbers."
        }
    },
    3: { // Investment Scam
        0: {
            safe: "Wise decision. Always verify SEBI registration and company legitimacy first.",
            danger: "Requesting a mentor call gives them direct personal access to manipulate you."
        },
        1: {
            safe: "Good instinct. Suppressed criticism in groups is a major red flag.",
            danger: "Engaging with the admin moves you deeper into their funnel."
        },
        2: {
            safe: "Smart. Trying to withdraw early often reveals the scam.",
            danger: "Adding more money to 'test' the platform plays into their greed trap."
        },
        3: {
            danger: "Paying extra fees to 'unlock' profits is the classic pig-butchering endgame."
        }
    },
    4: { // Tech Support Scam
        0: {
            safe: "Correct. Browser popups can be faked — use built-in security tools.",
            danger: "Calling numbers from popups connects you directly to scammers."
        },
        2: {
            danger: "Never grant remote access. Real support does not need to control your device."
        },
        3: {
            safe: "Good recovery step. Always run scans from trusted antivirus software."
        }
    },
    5: { // Marketplace Payment Scam
        0: {
            safe: "Best practice. Keep transactions inside the platform for protection.",
            danger: "Sharing UPI ID early is a common entry point for collect request scams."
        },
        2: {
            danger: "Entering UPI PIN on a collect request means you're sending money, not receiving it."
        }
    },
    6: { // AI Deepfake Scam
        0: {
            safe: "Good caution. Always question new numbers even if the face looks familiar.",
            danger: "Discussing money arrangements during emotional calls is very dangerous."
        },
        1: {
            safe: "Excellent. Verifying through saved contacts or family passphrase is crucial.",
            danger: "Sending money based on video calls without verification is a common mistake."
        },
        3: {
            danger: "Mismatched beneficiary names are one of the strongest red flags."
        }
    },
    7: { // Bank KYC Phishing
        0: {
            safe: "Perfect. Always open your bank app directly instead of clicking links.",
            danger: "Clicking links in urgent KYC emails leads to credential theft."
        },
        2: {
            danger: "Never enter OTPs on pages reached through email or SMS links."
        }
    },
    8: { // UPI Collect Request Scam
        1: {
            danger: "Approving collect requests to 'receive' money actually sends money from your account."
        },
        3: {
            safe: "Correct. UPI PIN is only for outgoing payments, never for receiving."
        }
    },
    9: { // Parcel Delivery Phishing
        0: {
            safe: "Good. Always track parcels through official apps or websites.",
            danger: "Paying small redelivery fees on fake sites leads to card theft."
        }
    },
    10: { // Fake Recruitment Scam
        0: {
            safe: "Wise. Always verify job offers through official company websites.",
            danger: "Opening onboarding links from unsolicited emails risks document theft."
        },
        2: {
            danger: "Legitimate employers never demand processing fees from candidates."
        }
    }
};

function getTailoredMentorResponse(levelId, stageIndex, severity) {
    const levelData = mentorResponses[levelId];
    if (!levelData || !levelData[stageIndex]) {
        if (severity === "safe") return "Strong decision. You're developing good cyber awareness.";
        if (severity === "danger") return "This choice created real risk. Be extra careful next time.";
        return "That was a risky move. Scammers often exploit small compromises.";
    }

    const stageData = levelData[stageIndex];
    return stageData[severity] || 
           (severity === "safe" ? "Well handled in this context." : 
            severity === "danger" ? "High risk decision in this scenario." : "Proceed with caution.");
}

function showMentorToast(message, state = "neutral") {
    const toast = document.createElement("div");
    toast.className = `mentor-toast ${state}`;
    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(#00ffd5,#00b38f);display:flex;align-items:center;justify-content:center;color:#041014;font-weight:900;font-size:16px;">S</div>
            <div style="flex:1;">
                <strong style="color:#00ffd5;">Sentinel</strong><br>
                <span style="font-size:0.93rem;line-height:1.45;">${message}</span>
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 600);
    }, 4200);
}

function triggerInitialGreeting() {
    setTimeout(() => {
        showMentorToast("Hello. I am Sentinel, your cyber analyst. I'll give you specific feedback tailored to each level and choice.", "neutral");
    }, 1000);
}

// Hook into chooseAction
const originalChooseAction = chooseAction;
chooseAction = function(index) {
    originalChooseAction(index);

    const levelId = profile.activeLevel;
    const stageIndex = activeStage;
    const selected = levels[levelId - 1].stages[stageIndex].choices[index];
    
    const message = getTailoredMentorResponse(levelId, stageIndex, selected.severity);
    const state = selected.severity === "safe" ? "impressed" : 
                selected.severity === "danger" ? "warning" : "alert";

    setTimeout(() => showMentorToast(message, state), 750);
};

// Add Floating Sentinel Icon
setTimeout(() => {
    if (document.getElementById("mentorFloat")) return;

    const html = `
        <div id="mentorFloat" onclick="alert('Sentinel gives you tailored advice after every choice you make.')"
            style="position:fixed;bottom:30px;right:30px;width:68px;height:68px;background:linear-gradient(145deg,#00ffd5,#00b38f);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 35px rgba(0,255,213,0.5);z-index:250;cursor:pointer;transition:all .3s;">
            <span style="font-size:34px;color:#041014;font-weight:900;">S</span>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    triggerInitialGreeting();
}, 600);

console.log("%c✅ Sentinel Fully Expanded (Levels 1-10) Loaded", "color:#00ffd5;font-weight:bold");

renderApp();
