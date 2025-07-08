// 🍔 Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburgerBtn && mobileMenu) {
        // Toggle menu on hamburger button click
        hamburgerBtn.addEventListener("click", function () {
            hamburgerBtn.classList.toggle("active");
            mobileMenu.classList.toggle("visible");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function(event) {
            const hamburgerWrapper = document.querySelector(".hamburger-wrapper");
            
            if (!hamburgerWrapper.contains(event.target)) {
                mobileMenu.classList.remove("visible");
                hamburgerBtn.classList.remove("active");
            }
        });
    }
});

// 🎬 Video Loading and Error Handling
document.addEventListener("DOMContentLoaded", function () {
    const videoItems = document.querySelectorAll(".video-item");
    
    videoItems.forEach(item => {
        const iframe = item.querySelector("iframe");
        
        if (iframe) {
            // Add loading indicator
            const loadingDiv = document.createElement("div");
            loadingDiv.className = "video-loading";
            loadingDiv.innerHTML = "📹 Loading video...";
            loadingDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255,255,255,0.9);
                padding: 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                color: #666;
            `;
            
            // Make video container relative for loading overlay
            item.style.position = "relative";
            item.appendChild(loadingDiv);
            
            // Remove loading indicator when video loads
            iframe.addEventListener("load", function() {
                if (loadingDiv.parentNode) {
                    loadingDiv.remove();
                }
            });
            
            // Handle iframe errors
            iframe.addEventListener("error", function() {
                loadingDiv.innerHTML = "❌ Video unavailable";
                loadingDiv.style.color = "#d58f76";
            });
        }
    });
});

// 📱 Resource Link Tracking
document.addEventListener("DOMContentLoaded", function () {
    const resourceLinks = document.querySelectorAll(".resource-item a");
    
    resourceLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const resourceName = this.closest(".resource-item").querySelector("h3").textContent;
            console.log(`Resource accessed: ${resourceName}`);
            
            // Add visual feedback
            const originalText = this.textContent;
            this.textContent = "Opening...";
            this.style.color = "rgba(66, 90, 59, 1)";
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = "";
            }, 1000);
        });
    });
});

// 🎯 Smooth Scroll for Internal Links
document.addEventListener("DOMContentLoaded", function () {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});

// ✨ Media Section Animations on Scroll
document.addEventListener("DOMContentLoaded", function () {
    const mediaSections = document.querySelectorAll(".media-section");
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);
    
    // Initial setup for animations
    mediaSections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        sectionObserver.observe(section);
    });
});

// 🎪 Interactive Media Gallery
document.addEventListener("DOMContentLoaded", function () {
    // Add click-to-expand functionality for video items
    const videoItems = document.querySelectorAll(".video-item");
    
    videoItems.forEach(item => {
        const title = item.querySelector("h3");
        
        if (title) {
            title.style.cursor = "pointer";
            title.addEventListener("click", function() {
                const description = item.querySelector("p");
                
                if (description) {
                    if (description.style.display === "none") {
                        description.style.display = "block";
                        description.style.animation = "fadeIn 0.3s ease";
                        this.textContent += " ▼";
                    } else {
                        description.style.display = "none";
                        this.textContent = this.textContent.replace(" ▼", "");
                    }
                }
            });
        }
    });
});

// 🎨 Dynamic Background Color Change
document.addEventListener("DOMContentLoaded", function () {
    let colorChangeInterval;
    
    function startColorAnimation() {
        const mediaSections = document.querySelectorAll(".media-section");
        let colorIndex = 0;
        
        const colors = [
            "rgba(255, 255, 255, 0.95)",
            "rgba(246, 214, 223, 0.9)",
            "rgba(207, 231, 245, 0.9)",
            "rgba(211, 241, 216, 0.9)"
        ];
        
        colorChangeInterval = setInterval(() => {
            mediaSections.forEach((section, index) => {
                const colorToUse = colors[(colorIndex + index) % colors.length];
                section.style.backgroundColor = colorToUse;
            });
            colorIndex = (colorIndex + 1) % colors.length;
        }, 3000);
    }
    
    function stopColorAnimation() {
        if (colorChangeInterval) {
            clearInterval(colorChangeInterval);
            // Reset to original color
            document.querySelectorAll(".media-section").forEach(section => {
                section.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            });
        }
    }
    
    // Start animation when page loads
    setTimeout(startColorAnimation, 2000);
    
    // Stop animation when user interacts with the page
    let userInteracted = false;
    document.addEventListener("click", function() {
        if (!userInteracted) {
            stopColorAnimation();
            userInteracted = true;
        }
    });
});

// 📊 Simple Analytics Tracking
document.addEventListener("DOMContentLoaded", function () {
    const analytics = {
        pageLoaded: new Date(),
        sectionsViewed: [],
        linksClicked: []
    };
    
    // Track section views
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector("h2")?.textContent || "Unknown Section";
                if (!analytics.sectionsViewed.includes(sectionTitle)) {
                    analytics.sectionsViewed.push(sectionTitle);
                    console.log(`Section viewed: ${sectionTitle}`);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll(".media-section").forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Track link clicks
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function() {
            analytics.linksClicked.push({
                url: this.href,
                text: this.textContent,
                timestamp: new Date()
            });
        });
    });
    
    // Log analytics on page unload
    window.addEventListener("beforeunload", function() {
        console.log("Media Page Analytics:", analytics);
    });
});
// 📱 Mental Health Apps Recommendation
function showMentalHealthApps() {
    const appModal = document.createElement('div');
    appModal.className = 'resource-modal';
    appModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🧠 Recommended Mental Health Apps</h2>
            <div class="app-list">
                <div class="app-item">
                    <h3>Headspace</h3>
                    <p><strong>Focus:</strong> Meditation & Mindfulness</p>
                    <p>Guided meditations, sleep stories, and mindfulness exercises.</p>
                    <a href="https://www.headspace.com" target="_blank">Visit Website</a>
                </div>
                <div class="app-item">
                    <h3>Calm</h3>
                    <p><strong>Focus:</strong> Sleep, Meditation & Relaxation</p>
                    <p>Sleep stories, daily calm sessions, and anxiety reduction tools.</p>
                    <a href="https://www.calm.com" target="_blank">Visit Website</a>
                </div>
                <div class="app-item">
                    <h3>BetterHelp</h3>
                    <p><strong>Focus:</strong> Online Therapy</p>
                    <p>Connect with licensed therapists for online counseling sessions.</p>
                    <a href="https://www.betterhelp.com" target="_blank">Visit Website</a>
                </div>
                <div class="app-item">
                    <h3>Daylio</h3>
                    <p><strong>Focus:</strong> Mood Tracking</p>
                    <p>Simple mood tracker to identify patterns and triggers.</p>
                    <a href="https://daylio.webflow.io" target="_blank">Visit Website</a>
                </div>
                <div class="app-item">
                    <h3>Sanvello</h3>
                    <p><strong>Focus:</strong> Anxiety & Depression</p>
                    <p>CBT-based tools, mood tracking, and coping techniques.</p>
                    <a href="https://www.sanvello.com" target="_blank">Visit Website</a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(appModal);
    setupModalClose(appModal);
}

// 🏠 Safe Space at Home Guide
function showSafeSpaceGuide() {
    const spaceModal = document.createElement('div');
    spaceModal.className = 'resource-modal';
    spaceModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🏠 Creating a Safe Space at Home</h2>
            <div class="guide-content">
                <h3>🌱 Physical Environment</h3>
                <ul>
                    <li>Choose a quiet corner or room for reflection</li>
                    <li>Add soft lighting (lamps instead of harsh overhead lights)</li>
                    <li>Include comfortable seating (cushions, blankets)</li>
                    <li>Add plants or natural elements</li>
                    <li>Keep the space clutter-free and organized</li>
                </ul>
                
                <h3>🎨 Sensory Elements</h3>
                <ul>
                    <li>Use calming colors (blues, greens, soft neutrals)</li>
                    <li>Include pleasant scents (essential oils, candles)</li>
                    <li>Add soft textures (pillows, throws, rugs)</li>
                    <li>Consider background sounds (nature sounds, soft music)</li>
                </ul>
                
                <h3>💚 Emotional Safety</h3>
                <ul>
                    <li>Create boundaries around the space</li>
                    <li>Include meaningful objects or photos</li>
                    <li>Keep journals or self-care tools nearby</li>
                    <li>Establish rules for interruption-free time</li>
                </ul>
            </div>
        </div>
    `;
    document.body.appendChild(spaceModal);
    setupModalClose(spaceModal);
}

// 👥 Support Groups Information
function showSupportGroups() {
    const groupModal = document.createElement('div');
    groupModal.className = 'resource-modal';
    groupModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>👥 Support Groups & Communities</h2>
            <div class="support-list">
                <div class="support-item">
                    <h3>🌐 Online Support Groups</h3>
                    <p><strong>NAMI Support Groups:</strong> Free peer support groups</p>
                    <a href="https://www.nami.org/Support-Education/Support-Groups" target="_blank">Find NAMI Groups</a>
                    
                    <p><strong>7 Cups:</strong> Free emotional support chat</p>
                    <a href="https://www.7cups.com" target="_blank">Visit 7 Cups</a>
                    
                    <p><strong>Depression and Bipolar Support Alliance:</strong> Peer support groups</p>
                    <a href="https://www.dbsalliance.org/support/chapters-support-groups/" target="_blank">Find DBSA Groups</a>
                </div>
                
                <div class="support-item">
                    <h3>🏢 Local Support Options</h3>
                    <p><strong>Community Mental Health Centers:</strong> Check your local area</p>
                    <p><strong>Religious Organizations:</strong> Many offer support groups</p>
                    <p><strong>Libraries & Community Centers:</strong> Often host support meetings</p>
                    <p><strong>Hospitals:</strong> Many have outpatient support programs</p>
                </div>
                
                <div class="support-item">
                    <h3>🎯 Specialized Groups</h3>
                    <p><strong>Anxiety:</strong> Anxiety and Depression Association of America</p>
                    <p><strong>PTSD:</strong> Veterans' organizations and trauma centers</p>
                    <p><strong>Addiction:</strong> AA, NA, SMART Recovery</p>
                    <p><strong>Grief:</strong> GriefShare and local hospice organizations</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(groupModal);
    setupModalClose(groupModal);
}

// 🆘 Crisis Resources
function showCrisisResources() {
    const crisisModal = document.createElement('div');
    crisisModal.className = 'resource-modal crisis-modal';
    crisisModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🆘 Crisis Resources & Emergency Help</h2>
            <div class="crisis-content">
                <div class="emergency-section">
                    <h3>🚨 Immediate Emergency</h3>
                    <p class="emergency-text">If you are in immediate danger, call 911</p>
                </div>
                
                <div class="hotline-section">
                    <h3>📞 24/7 Crisis Hotlines</h3>
                    <div class="hotline-item">
                        <h4>988 Suicide & Crisis Lifeline</h4>
                        <p><strong>Call:</strong> 988</p>
                        <p><strong>Chat:</strong> <a href="https://988lifeline.org/chat" target="_blank">988lifeline.org/chat</a></p>
                    </div>
                    
                    <div class="hotline-item">
                        <h4>Crisis Text Line</h4>
                        <p><strong>Text HOME to 741741</strong></p>
                        <p>Free, 24/7 crisis support via text message</p>
                    </div>
                    
                    <div class="hotline-item">
                        <h4>SAMHSA National Helpline</h4>
                        <p><strong>Call:</strong> 1-800-662-4357</p>
                        <p>Treatment referral and information service</p>
                    </div>
                </div>
                
                <div class="specialized-section">
                    <h3>🎯 Specialized Crisis Support</h3>
                    <p><strong>Veterans Crisis Line:</strong> Call 988, Press 1</p>
                    <p><strong>LGBTQ National Hotline:</strong> 1-888-843-4564</p>
                    <p><strong>Domestic Violence Hotline:</strong> 1-800-799-7233</p>
                    <p><strong>Rape, Abuse & Incest National Network:</strong> 1-800-656-4673</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(crisisModal);
    setupModalClose(crisisModal);
}

// 😌 Mindfulness Exercises
function showMindfulnessExercises() {
    const mindfulModal = document.createElement('div');
    mindfulModal.className = 'resource-modal';
    mindfulModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>😌 Daily Mindfulness Exercises</h2>
            <div class="exercise-list">
                <div class="exercise-item">
                    <h3>🌬️ 4-7-8 Breathing (2 minutes)</h3>
                    <ol>
                        <li>Inhale through nose for 4 counts</li>
                        <li>Hold breath for 7 counts</li>
                        <li>Exhale through mouth for 8 counts</li>
                        <li>Repeat 3-4 times</li>
                    </ol>
                </div>
                
                <div class="exercise-item">
                    <h3>👁️ 5-4-3-2-1 Grounding (5 minutes)</h3>
                    <ul>
                        <li><strong>5 things</strong> you can see</li>
                        <li><strong>4 things</strong> you can touch</li>
                        <li><strong>3 things</strong> you can hear</li>
                        <li><strong>2 things</strong> you can smell</li>
                        <li><strong>1 thing</strong> you can taste</li>
                    </ul>
                </div>
                
                <div class="exercise-item">
                    <h3>🍇 Mindful Eating (10 minutes)</h3>
                    <ol>
                        <li>Choose a small snack (raisin, piece of chocolate)</li>
                        <li>Examine it closely - color, texture, shape</li>
                        <li>Smell it and notice any reactions</li>
                        <li>Place it in your mouth without chewing</li>
                        <li>Chew slowly, noticing flavors and textures</li>
                    </ol>
                </div>
                
                <div class="exercise-item">
                    <h3>🚶 Walking Meditation (10 minutes)</h3>
                    <ol>
                        <li>Walk slowly, focusing on each step</li>
                        <li>Notice the feeling of your feet touching the ground</li>
                        <li>Pay attention to your surroundings without judgment</li>
                        <li>When mind wanders, gently return focus to walking</li>
                    </ol>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(mindfulModal);
    setupModalClose(mindfulModal);
}

// 🧠 Mental Health First Aid Guide
function showFirstAidGuide() {
    const firstAidModal = document.createElement('div');
    firstAidModal.className = 'resource-modal';
    firstAidModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🧠 Mental Health First Aid Guide</h2>
            <div class="first-aid-content">
                <div class="aid-section">
                    <h3>🎯 ALGEE Action Plan</h3>
                    <ul>
                        <li><strong>A</strong>ssess for risk of suicide or harm</li>
                        <li><strong>L</strong>isten nonjudgmentally</li>
                        <li><strong>G</strong>ive reassurance and information</li>
                        <li><strong>E</strong>ncourage appropriate professional help</li>
                        <li><strong>E</strong>ncourage self-help and other support strategies</li>
                    </ul>
                </div>
                
                <div class="aid-section">
                    <h3>⚠️ Warning Signs to Watch For</h3>
                    <ul>
                        <li>Talk of suicide or wanting to die</li>
                        <li>Increased substance use</li>
                        <li>Extreme mood swings</li>
                        <li>Withdrawal from friends and activities</li>
                        <li>Changes in eating or sleeping patterns</li>
                        <li>Giving away prized possessions</li>
                    </ul>
                </div>
                
                <div class="aid-section">
                    <h3>💬 What to Say</h3>
                    <ul>
                        <li>"I'm concerned about you"</li>
                        <li>"You're not alone in this"</li>
                        <li>"How can I help you?"</li>
                        <li>"Would you like to talk about it?"</li>
                        <li>"I care about you"</li>
                    </ul>
                </div>
                
                <div class="aid-section">
                    <h3>🚫 What NOT to Say</h3>
                    <ul>
                        <li>"Just think positive"</li>
                        <li>"Others have it worse"</li>
                        <li>"It's all in your head"</li>
                        <li>"Snap out of it"</li>
                        <li>"You don't look depressed"</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(firstAidModal);
    setupModalClose(firstAidModal);
}

// Modal close functionality
function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// CSS for modals
const modalCSS = `
.resource-modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 2rem;
    border-radius: 16px;
    width: 80%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.close-modal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: 1rem;
    top: 1rem;
}

.close-modal:hover {
    color: #000;
}

.app-item, .support-item, .exercise-item, .aid-section {
    background: rgba(246, 214, 223, 0.3);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    border-left: 4px solid rgba(66, 90, 59, 1);
}

.app-item h3, .support-item h3, .exercise-item h3, .aid-section h3 {
    color: rgba(66, 90, 59, 1);
    margin-top: 0;
}

.crisis-modal .emergency-section {
    background: rgba(231, 76, 60, 0.1);
    border-left-color: #e74c3c;
}

.emergency-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #e74c3c;
}

.hotline-item {
    background: rgba(52, 152, 219, 0.1);
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 6px;
}

.hotline-item h4 {
    margin: 0 0 0.5rem 0;
    color: #3498db;
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 10% auto;
        padding: 1rem;
    }
}
`;
// 🎧 Mental Health Matters Podcast
function showMentalHealthPodcast() {
    const podcastModal = document.createElement('div');
    podcastModal.className = 'resource-modal';
    podcastModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🎧 "Mental Health Matters" Podcast</h2>
            <div class="podcast-content">
                <div class="podcast-info">
                    <p><strong>Host:</strong> Dr. Lisa Martinez, Licensed Clinical Psychologist</p>
                    <p><strong>Format:</strong> Weekly 30-45 minute episodes</p>
                    <p><strong>Topics:</strong> Current mental health research, treatment approaches, and expert interviews</p>
                </div>
                
                <h3>🎙️ Recent Episodes</h3>
                <div class="episode-list">
                    <div class="episode-item">
                        <h4>Episode 47: "Understanding Trauma-Informed Care"</h4>
                        <p>Exploring how trauma affects the brain and body, plus healing approaches.</p>
                        <div class="podcast-links">
                            <a href="https://open.spotify.com" target="_blank">🎵 Spotify</a>
                            <a href="https://podcasts.apple.com" target="_blank">🍎 Apple Podcasts</a>
                            <a href="https://podcasts.google.com" target="_blank">🔍 Google Podcasts</a>
                        </div>
                    </div>
                    
                    <div class="episode-item">
                        <h4>Episode 46: "Anxiety in the Digital Age"</h4>
                        <p>How social media and technology impact anxiety levels and coping strategies.</p>
                        <div class="podcast-links">
                            <a href="https://open.spotify.com" target="_blank">🎵 Spotify</a>
                            <a href="https://podcasts.apple.com" target="_blank">🍎 Apple Podcasts</a>
                            <a href="https://podcasts.google.com" target="_blank">🔍 Google Podcasts</a>
                        </div>
                    </div>
                    
                    <div class="episode-item">
                        <h4>Episode 45: "The Science of Happiness"</h4>
                        <p>Research-backed strategies for building sustainable happiness and well-being.</p>
                        <div class="podcast-links">
                            <a href="https://open.spotify.com" target="_blank">🎵 Spotify</a>
                            <a href="https://podcasts.apple.com" target="_blank">🍎 Apple Podcasts</a>
                            <a href="https://podcasts.google.com" target="_blank">🔍 Google Podcasts</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(podcastModal);
    setupModalClose(podcastModal);
}

// 🎙️ Dr. Sarah Johnson Interview
function showDrSarahInterview() {
    const interviewModal = document.createElement('div');
    interviewModal.className = 'resource-modal';
    interviewModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🎙️ Interview: Dr. Sarah Johnson on Trauma Recovery</h2>
            <div class="interview-content">
                <div class="expert-info">
                    <h3>👩‍⚕️ About Dr. Sarah Johnson</h3>
                    <p><strong>Credentials:</strong> Ph.D. in Clinical Psychology, Trauma Specialist</p>
                    <p><strong>Experience:</strong> 15+ years treating PTSD and complex trauma</p>
                    <p><strong>Specialties:</strong> EMDR, Somatic Therapy, Trauma-Informed Care</p>
                </div>
                
                <div class="interview-details">
                    <h3>🎯 Interview Topics Covered</h3>
                    <ul>
                        <li>Understanding different types of trauma</li>
                        <li>How trauma affects the nervous system</li>
                        <li>Evidence-based treatment approaches</li>
                        <li>Self-care strategies for trauma survivors</li>
                        <li>Building resilience and post-traumatic growth</li>
                    </ul>
                </div>
                
                <div class="audio-player">
                    <h3>🎧 Listen to Interview (42 minutes)</h3>
                    <div class="play-button" onclick="playInterview()">
                        ▶️ Play Interview
                    </div>
                    <p><em>Note: This is a simulated audio player. In a real implementation, this would connect to your audio hosting service.</em></p>
                    
                    <div class="interview-links">
                        <a href="#" onclick="alert('Download would start here')">📥 Download MP3</a>
                        <a href="#" onclick="alert('Transcript would open here')">📝 Read Transcript</a>
                        <a href="#" onclick="alert('Show notes would open here')">📋 Show Notes</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(interviewModal);
    setupModalClose(interviewModal);
}

// 🎵 Therapeutic Music & Sounds
function showTherapeuticMusic() {
    const musicModal = document.createElement('div');
    musicModal.className = 'resource-modal';
    musicModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🎵 Therapeutic Music & Sounds</h2>
            <div class="music-content">
                <div class="playlist-section">
                    <h3>🌊 Nature Sounds for Relaxation</h3>
                    <div class="music-list">
                        <div class="music-item">
                            <span>🌧️ Gentle Rain & Thunder (20 min)</span>
                            <button onclick="playTrack('rain')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🌊 Ocean Waves (30 min)</span>
                            <button onclick="playTrack('ocean')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🌲 Forest Ambience (25 min)</span>
                            <button onclick="playTrack('forest')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🔥 Crackling Fireplace (45 min)</span>
                            <button onclick="playTrack('fireplace')">▶️ Play</button>
                        </div>
                    </div>
                </div>
                
                <div class="playlist-section">
                    <h3>🎼 Calming Instrumental Music</h3>
                    <div class="music-list">
                        <div class="music-item">
                            <span>🎹 Piano Meditation (15 min)</span>
                            <button onclick="playTrack('piano')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🎻 Peaceful Strings (22 min)</span>
                            <button onclick="playTrack('strings')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🎸 Acoustic Wellness (18 min)</span>
                            <button onclick="playTrack('acoustic')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🧘 Tibetan Singing Bowls (35 min)</span>
                            <button onclick="playTrack('bowls')">▶️ Play</button>
                        </div>
                    </div>
                </div>
                
                <div class="playlist-section">
                    <h3>💤 Sleep & Bedtime Sounds</h3>
                    <div class="music-list">
                        <div class="music-item">
                            <span>🌙 White Noise (8 hours)</span>
                            <button onclick="playTrack('whitenoise')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>✨ Pink Noise for Deep Sleep (8 hours)</span>
                            <button onclick="playTrack('pinknoise')">▶️ Play</button>
                        </div>
                        <div class="music-item">
                            <span>🦗 Night Crickets (4 hours)</span>
                            <button onclick="playTrack('crickets')">▶️ Play</button>
                        </div>
                    </div>
                </div>
                
                <div class="music-info">
                    <p><strong>💡 Tip:</strong> Use headphones for the best therapeutic effect. These sounds can help reduce anxiety, improve focus, and promote better sleep.</p>
                    
                    <div class="external-links">
                        <h4>🔗 Access Full Playlists On:</h4>
                        <a href="https://open.spotify.com" target="_blank">🎵 Spotify</a>
                        <a href="https://music.youtube.com" target="_blank">📺 YouTube Music</a>
                        <a href="https://music.apple.com" target="_blank">🍎 Apple Music</a>
                        <a href="https://www.calm.com" target="_blank">😌 Calm App</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(musicModal);
    setupModalClose(musicModal);
}

// 📻 Wellness Wednesday Radio Series
function showWellnessWednesday() {
    const radioModal = document.createElement('div');
    radioModal.className = 'resource-modal';
    radioModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>📻 "Wellness Wednesday" Radio Series</h2>
            <div class="radio-content">
                <div class="series-info">
                    <p><strong>Format:</strong> 15-minute focused episodes every Wednesday</p>
                    <p><strong>Host:</strong> Mental Health Team at Advanced Counseling Solutions</p>
                    <p><strong>Focus:</strong> Quick, actionable wellness tips for busy lives</p>
                </div>
                
                <h3>🎙️ Recent Episodes</h3>
                <div class="episode-grid">
                    <div class="radio-episode">
                        <h4>Episode 12: "5-Minute Morning Mindfulness"</h4>
                        <p>Quick morning routine to set a positive tone for your day.</p>
                        <span class="episode-date">January 29, 2025</span>
                        <button onclick="playRadioEpisode('morning-mindfulness')">🎧 Listen</button>
                    </div>
                    
                    <div class="radio-episode">
                        <h4>Episode 11: "Boundary Setting at Work"</h4>
                        <p>Practical strategies for maintaining work-life balance.</p>
                        <span class="episode-date">January 22, 2025</span>
                        <button onclick="playRadioEpisode('work-boundaries')">🎧 Listen</button>
                    </div>
                    
                    <div class="radio-episode">
                        <h4>Episode 10: "Digital Detox Tips"</h4>
                        <p>How to take healthy breaks from technology and social media.</p>
                        <span class="episode-date">January 15, 2025</span>
                        <button onclick="playRadioEpisode('digital-detox')">🎧 Listen</button>
                    </div>
                    
                    <div class="radio-episode">
                        <h4>Episode 9: "Stress-Relief Breathing"</h4>
                        <p>Three breathing techniques you can use anywhere, anytime.</p>
                        <span class="episode-date">January 8, 2025</span>
                        <button onclick="playRadioEpisode('breathing-techniques')">🎧 Listen</button>
                    </div>
                    
                    <div class="radio-episode">
                        <h4>Episode 8: "Gratitude Practice"</h4>
                        <p>Simple ways to incorporate gratitude into your daily routine.</p>
                        <span class="episode-date">January 1, 2025</span>
                        <button onclick="playRadioEpisode('gratitude')">🎧 Listen</button>
                    </div>
                    
                    <div class="radio-episode">
                        <h4>Episode 7: "Winter Blues Solutions"</h4>
                        <p>Combating seasonal depression with light, movement, and connection.</p>
                        <span class="episode-date">December 25, 2024</span>
                        <button onclick="playRadioEpisode('winter-blues')">🎧 Listen</button>
                    </div>
                </div>
                
                <div class="subscription-info">
                    <h3>📬 Subscribe for New Episodes</h3>
                    <p>Never miss a Wellness Wednesday episode!</p>
                    <div class="subscribe-buttons">
                        <button onclick="alert('Email subscription would be set up here')">📧 Email Updates</button>
                        <button onclick="alert('RSS feed would be provided here')">📡 RSS Feed</button>
                        <button onclick="alert('Podcast app links would be here')">🎧 Podcast Apps</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(radioModal);
    setupModalClose(radioModal);
}

// Audio player functions (simulated)
function playTrack(trackType) {
    alert(`🎵 Now playing: ${trackType} sounds. In a real implementation, this would start audio playback.`);
}

function playInterview() {
    alert('🎙️ Starting Dr. Sarah Johnson interview. In a real implementation, this would begin audio playback.');
}

function playRadioEpisode(episode) {
    alert(`📻 Playing Wellness Wednesday episode: ${episode}. In a real implementation, this would start the audio.`);
}

// 🎵 There
// Add CSS to page
const styleSheet = document.createElement("style");
styleSheet.textContent = modalCSS;
document.head.appendChild(styleSheet);

// 🔍 Mental Health Self-Assessment
function startAssessment() {
    const assessmentModal = document.createElement('div');
    assessmentModal.className = 'resource-modal';
    assessmentModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🔍 Mental Health Self-Assessment</h2>
            <div class="assessment-content">
                <div class="disclaimer">
                    <h3>⚠️ Important Disclaimer</h3>
                    <p>This assessment is for informational purposes only and is not a substitute for professional diagnosis. If you're experiencing a mental health crisis, please contact a healthcare provider or crisis hotline immediately.</p>
                </div>
                
                <form id="mentalHealthAssessment">
                    <div class="question-group">
                        <h4>1. Over the past 2 weeks, how often have you felt down, depressed, or hopeless?</h4>
                        <label><input type="radio" name="q1" value="0"> Not at all</label>
                        <label><input type="radio" name="q1" value="1"> Several days</label>
                        <label><input type="radio" name="q1" value="2"> More than half the days</label>
                        <label><input type="radio" name="q1" value="3"> Nearly every day</label>
                    </div>
                    
                    <div class="question-group">
                        <h4>2. Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?</h4>
                        <label><input type="radio" name="q2" value="0"> Not at all</label>
                        <label><input type="radio" name="q2" value="1"> Several days</label>
                        <label><input type="radio" name="q2" value="2"> More than half the days</label>
                        <label><input type="radio" name="q2" value="3"> Nearly every day</label>
                    </div>
                    
                    <div class="question-group">
                        <h4>3. How often do you have trouble falling or staying asleep?</h4>
                        <label><input type="radio" name="q3" value="0"> Rarely or never</label>
                        <label><input type="radio" name="q3" value="1"> Sometimes</label>
                        <label><input type="radio" name="q3" value="2"> Often</label>
                        <label><input type="radio" name="q3" value="3"> Almost always</label>
                    </div>
                    
                    <div class="question-group">
                        <h4>4. How often do you feel overwhelmed by daily responsibilities?</h4>
                        <label><input type="radio" name="q4" value="0"> Rarely or never</label>
                        <label><input type="radio" name="q4" value="1"> Sometimes</label>
                        <label><input type="radio" name="q4" value="2"> Often</label>
                        <label><input type="radio" name="q4" value="3"> Almost always</label>
                    </div>
                    
                    <div class="question-group">
                        <h4>5. How satisfied are you with your current social support system?</h4>
                        <label><input type="radio" name="q5" value="3"> Very satisfied</label>
                        <label><input type="radio" name="q5" value="2"> Somewhat satisfied</label>
                        <label><input type="radio" name="q5" value="1"> Not very satisfied</label>
                        <label><input type="radio" name="q5" value="0"> Not satisfied at all</label>
                    </div>
                    
                    <button type="button" onclick="calculateAssessment()" class="assessment-btn">Get My Results</button>
                </form>
                
                <div id="assessmentResults" style="display: none;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(assessmentModal);
    setupModalClose(assessmentModal);
}

function calculateAssessment() {
    const form = document.getElementById('mentalHealthAssessment');
    const formData = new FormData(form);
    let totalScore = 0;
    let answeredQuestions = 0;
    
    for (let i = 1; i <= 5; i++) {
        const answer = formData.get(`q${i}`);
        if (answer !== null) {
            totalScore += parseInt(answer);
            answeredQuestions++;
        }
    }
    
    if (answeredQuestions < 5) {
        alert('Please answer all questions to get your results.');
        return;
    }
    
    let resultHTML = '';
    let recommendation = '';
    
    if (totalScore <= 5) {
        resultHTML = `
            <div class="result-good">
                <h3>💚 Your Results: Low Risk</h3>
                <p>Your responses suggest you're managing well overall. Continue with healthy habits!</p>
            </div>
        `;
        recommendation = `
            <h4>🌟 Recommendations:</h4>
            <ul>
                <li>Maintain your current self-care routine</li>
                <li>Consider preventive wellness activities</li>
                <li>Stay connected with your support system</li>
            </ul>
        `;
    } else if (totalScore <= 10) {
        resultHTML = `
            <div class="result-moderate">
                <h3>⚠️ Your Results: Moderate Concern</h3>
                <p>You may be experiencing some mental health challenges that could benefit from attention.</p>
            </div>
        `;
        recommendation = `
            <h4>💡 Recommendations:</h4>
            <ul>
                <li>Consider speaking with a mental health professional</li>
                <li>Explore stress management techniques</li>
                <li>Prioritize sleep and self-care</li>
                <li>Reach out to trusted friends or family</li>
            </ul>
        `;
    } else {
        resultHTML = `
            <div class="result-high">
                <h3>🚨 Your Results: Higher Concern</h3>
                <p>Your responses suggest you may benefit significantly from professional support.</p>
            </div>
        `;
        recommendation = `
            <h4>🎯 Strong Recommendations:</h4>
            <ul>
                <li>Contact a mental health professional soon</li>
                <li>Consider calling our office for an appointment</li>
                <li>If experiencing crisis thoughts, call 988 immediately</li>
                <li>Lean on your support system</li>
            </ul>
        `;
    }
    
    document.getElementById('assessmentResults').innerHTML = `
        ${resultHTML}
        ${recommendation}
        <div class="next-steps">
            <h4>📞 Next Steps:</h4>
            <button onclick="alert('This would open appointment booking')">📅 Schedule Consultation</button>
            <button onclick="showCrisisResources()">🆘 Crisis Resources</button>
            <button onclick="alert('This would email results')">📧 Email Results</button>
        </div>
    `;
    
    document.getElementById('assessmentResults').style.display = 'block';
    form.style.display = 'none';
}

// 📊 Mood Tracking Journal
function showMoodTracker() {
    const moodModal = document.createElement('div');
    moodModal.className = 'resource-modal';
    moodModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>📊 Mood Tracking Journal</h2>
            <div class="mood-content">
                <div class="mood-entry">
                    <h3>📝 Today's Mood Entry</h3>
                    <div class="mood-selector">
                        <h4>How are you feeling today?</h4>
                        <div class="mood-options">
                            <button class="mood-btn" onclick="selectMood('excellent', '😄')">😄 Excellent</button>
                            <button class="mood-btn" onclick="selectMood('good', '😊')">😊 Good</button>
                            <button class="mood-btn" onclick="selectMood('okay', '😐')">😐 Okay</button>
                            <button class="mood-btn" onclick="selectMood('low', '😔')">😔 Low</button>
                            <button class="mood-btn" onclick="selectMood('difficult', '😢')">😢 Difficult</button>
                        </div>
                        <div id="selectedMood"></div>
                    </div>
                    
                    <div class="mood-factors">
                        <h4>What factors influenced your mood today? (Check all that apply)</h4>
                        <div class="factor-grid">
                            <label><input type="checkbox" value="sleep"> 😴 Sleep quality</label>
                            <label><input type="checkbox" value="exercise"> 🏃 Exercise</label>
                            <label><input type="checkbox" value="work"> 💼 Work stress</label>
                            <label><input type="checkbox" value="relationships"> 👥 Relationships</label>
                            <label><input type="checkbox" value="weather"> 🌤️ Weather</label>
                            <label><input type="checkbox" value="health"> 🏥 Physical health</label>
                            <label><input type="checkbox" value="finance"> 💰 Financial concerns</label>
                            <label><input type="checkbox" value="family"> 👨‍👩‍👧‍👦 Family</label>
                        </div>
                    </div>
                    
                    <div class="mood-notes">
                        <h4>Additional thoughts or notes:</h4>
                        <textarea id="moodNotes" placeholder="What made today special? Any insights about your mood?"></textarea>
                    </div>
                    
                    <button onclick="saveMoodEntry()" class="save-mood-btn">💾 Save Today's Entry</button>
                </div>
                
                <div class="mood-history">
                    <h3>📈 Your Mood Patterns</h3>
                    <div class="mood-chart">
                        <p>This week's mood overview:</p>
                        <div class="week-display">
                            <div class="day-mood">Mon<br>😊</div>
                            <div class="day-mood">Tue<br>😐</div>
                            <div class="day-mood">Wed<br>😔</div>
                            <div class="day-mood">Thu<br>😊</div>
                            <div class="day-mood">Fri<br>😄</div>
                            <div class="day-mood">Sat<br>😊</div>
                            <div class="day-mood">Sun<br>?</div>
                        </div>
                    </div>
                    
                    <div class="insights">
                        <h4>🔍 Insights from your tracking:</h4>
                        <ul>
                            <li>Your mood tends to be higher on weekends</li>
                            <li>Exercise days correlate with better moods</li>
                            <li>Wednesday appears to be your most challenging day</li>
                        </ul>
                        
                        <button onclick="alert('Full report would generate here')">📊 View Detailed Report</button>
                        <button onclick="alert('Export feature would work here')">📤 Export Data</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(moodModal);
    setupModalClose(moodModal);
}

let selectedMoodValue = '';

function selectMood(mood, emoji) {
    selectedMoodValue = mood;
    document.getElementById('selectedMood').innerHTML = `
        <div class="selected-mood-display">
            <p>Selected: ${emoji} ${mood}</p>
        </div>
    `;
    
    // Remove active class from all buttons
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    // Add active class to selected button
    event.target.classList.add('active');
}

function saveMoodEntry() {
    if (!selectedMoodValue) {
        alert('Please select a mood first!');
        return;
    }
    
    const factors = Array.from(document.querySelectorAll('.factor-grid input:checked')).map(cb => cb.value);
    const notes = document.getElementById('moodNotes').value;
    
    alert(`Mood entry saved! 
    Mood: ${selectedMoodValue}
    Factors: ${factors.join(', ') || 'None selected'}
    Notes: ${notes || 'No additional notes'}
    
    In a real app, this would be saved to your personal database.`);
}

// 🎯 Goal Setting Worksheet
function showGoalSetting() {
    const goalModal = document.createElement('div');
    goalModal.className = 'resource-modal';
    goalModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🎯 Mental Health Goal Setting Worksheet</h2>
            <div class="goal-content">
                <div class="goal-intro">
                    <p>Setting specific, achievable mental health goals can help you track progress and stay motivated on your wellness journey.</p>
                </div>
                
                <div class="goal-form">
                    <div class="goal-section">
                        <h3>1️⃣ Identify Your Main Focus Area</h3>
                        <select id="focusArea">
                            <option value="">Select an area...</option>
                            <option value="anxiety">Managing Anxiety</option>
                            <option value="depression">Improving Mood</option>
                            <option value="stress">Stress Management</option>
                            <option value="sleep">Better Sleep</option>
                            <option value="relationships">Healthier Relationships</option>
                            <option value="self-care">Self-Care Routine</option>
                            <option value="confidence">Building Confidence</option>
                            <option value="communication">Communication Skills</option>
                        </select>
                    </div>
                    
                    <div class="goal-section">
                        <h3>2️⃣ Write Your SMART Goal</h3>
                        <p><strong>SMART = Specific, Measurable, Achievable, Relevant, Time-bound</strong></p>
                        <textarea id="smartGoal" placeholder="Example: I will practice deep breathing for 5 minutes every morning for the next 30 days to help manage my anxiety."></textarea>
                    </div>
                    
                    <div class="goal-section">
                        <h3>3️⃣ Break It Down - Daily Actions</h3>
                        <p>What small daily steps will help you reach this goal?</p>
                        <div class="daily-actions">
                            <input type="text" placeholder="Daily action 1" class="action-input">
                            <input type="text" placeholder="Daily action 2" class="action-input">
                            <input type="text" placeholder="Daily action 3" class="action-input">
                        </div>
                    </div>
                    
                    <div class="goal-section">
                        <h3>4️⃣ Identify Potential Obstacles</h3>
                        <textarea id="obstacles" placeholder="What might get in the way of achieving this goal? How can you prepare for these challenges?"></textarea>
                    </div>
                    
                    <div class="goal-section">
                        <h3>5️⃣ Support System</h3>
                        <textarea id="support" placeholder="Who can help support you in achieving this goal? How will you ask for help when needed?"></textarea>
                    </div>
                    
                    <div class="goal-section">
                        <h3>6️⃣ How Will You Track Progress?</h3>
                        <div class="tracking-options">
                            <label><input type="checkbox" value="journal"> Daily journal entries</label>
                            <label><input type="checkbox" value="mood"> Mood tracking</label>
                            <label><input type="checkbox" value="calendar"> Calendar check-ins</label>
                            <label><input type="checkbox" value="app"> Mobile app tracking</label>
                            <label><input type="checkbox" value="therapist"> Weekly therapist check-ins</label>
                        </div>
                    </div>
                    
                    <div class="goal-section">
                        <h3>7️⃣ Reward System</h3>
                        <p>How will you celebrate small wins and major milestones?</p>
                        <input type="text" id="smallReward" placeholder="Small win reward (weekly)">
                        <input type="text" id="bigReward" placeholder="Major milestone reward (monthly)">
                    </div>
                    
                    <button onclick="generateGoalPlan()" class="goal-btn">📋 Generate My Goal Plan</button>
                </div>
                
                <div id="goalResults" style="display: none;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(goalModal);
    setupModalClose(goalModal);
}

function generateGoalPlan() {
    const focusArea = document.getElementById('focusArea').value;
    const smartGoal = document.getElementById('smartGoal').value;
    const obstacles = document.getElementById('obstacles').value;
    const support = document.getElementById('support').value;
    const smallReward = document.getElementById('smallReward').value;
    const bigReward = document.getElementById('bigReward').value;
    
    const actions = Array.from(document.querySelectorAll('.action-input')).map(input => input.value).filter(value => value);
    const tracking = Array.from(document.querySelectorAll('.tracking-options input:checked')).map(cb => cb.value);
    
    if (!focusArea || !smartGoal) {
        alert('Please fill in at least the focus area and SMART goal.');
        return;
    }
    
    document.getElementById('goalResults').innerHTML = `
        <div class="goal-plan">
            <h3>🎯 Your Personal Mental Health Goal Plan</h3>
            
            <div class="plan-section">
                <h4>Focus Area:</h4>
                <p>${focusArea}</p>
            </div>
            
            <div class="plan-section">
                <h4>Your SMART Goal:</h4>
                <p>${smartGoal}</p>
            </div>
            
            ${actions.length > 0 ? `
                <div class="plan-section">
                    <h4>Daily Actions:</h4>
                    <ul>${actions.map(action => `<li>${action}</li>`).join('')}</ul>
                </div>
            ` : ''}
            
            ${obstacles ? `
                <div class="plan-section">
                    <h4>Potential Obstacles & Solutions:</h4>
                    <p>${obstacles}</p>
                </div>
            ` : ''}
            
            ${support ? `
                <div class="plan-section">
                    <h4>Support System:</h4>
                    <p>${support}</p>
                </div>
            ` : ''}
            
            ${tracking.length > 0 ? `
                <div class="plan-section">
                    <h4>Progress Tracking:</h4>
                    <ul>${tracking.map(method => `<li>${method}</li>`).join('')}</ul>
                </div>
            ` : ''}
            
            <div class="plan-section">
                <h4>Reward System:</h4>
                ${smallReward ? `<p><strong>Weekly:</strong> ${smallReward}</p>` : ''}
                ${bigReward ? `<p><strong>Monthly:</strong> ${bigReward}</p>` : ''}
            </div>
            
            <div class="plan-actions">
                <button onclick="alert('Plan would be saved here')">💾 Save Plan</button>
                <button onclick="alert('Plan would be emailed here')">📧 Email Plan</button>
                <button onclick="alert('Calendar reminders would be set here')">📅 Set Reminders</button>
            </div>
        </div>
    `;
    
    document.getElementById('goalResults').style.display = 'block';
    document.querySelector('.goal-form').style.display = 'none';
}

// 🧘 Guided Meditation Library
function showMeditationLibrary() {
    const meditationModal = document.createElement('div');
    meditationModal.className = 'resource-modal';
    meditationModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🧘 Guided Meditation Library</h2>
            <div class="meditation-content">
                <div class="meditation-categories">
                    <div class="category-section">
                        <h3>😰 Anxiety Relief</h3>
                        <div class="meditation-list">
                            <div class="meditation-item">
                                <h4>🌊 Ocean of Calm (10 min)</h4>
                                <p>Visualize peaceful ocean waves to reduce anxiety and tension.</p>
                                <button onclick="playMeditation('ocean-calm')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🌬️ Breathing Space (5 min)</h4>
                                <p>Quick breathing exercise for immediate anxiety relief.</p>
                                <button onclick="playMeditation('breathing-space')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🏔️ Mountain Stability (15 min)</h4>
                                <p>Build inner strength and stability like an unshakeable mountain.</p>
                                <button onclick="playMeditation('mountain-stability')">🎧 Play</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-section">
                        <h3>💤 Sleep & Relaxation</h3>
                        <div class="meditation-list">
                            <div class="meditation-item">
                                <h4>🌙 Moonlight Relaxation (20 min)</h4>
                                <p>Gentle body scan to prepare for restful sleep.</p>
                                <button onclick="playMeditation('moonlight-relaxation')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>⭐ Starlight Journey (30 min)</h4>
                                <p>Extended sleep meditation with cosmic imagery.</p>
                                <button onclick="playMeditation('starlight-journey')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🌿 Forest Dreams (25 min)</h4>
                                <p>Fall asleep to the sounds of a peaceful forest.</p>
                                <button onclick="playMeditation('forest-dreams')">🎧 Play</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-section">
                        <h3>⚡ Stress Relief</h3>
                        <div class="meditation-list">
                            <div class="meditation-item">
                                <h4>🧊 Ice Cube Visualization (8 min)</h4>
                                <p>Melt away stress with cooling visualization techniques.</p>
                                <button onclick="playMeditation('ice-cube')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🎈 Balloon Release (12 min)</h4>
                                <p>Let go of stress and worries by releasing them like balloons.</p>
                                <button onclick="playMeditation('balloon-release')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🌅 Dawn of Peace (18 min)</h4>
                                <p>Start fresh with a peaceful sunrise meditation.</p>
                                <button onclick="playMeditation('dawn-peace')">🎧 Play</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-section">
                        <h3>💪 Confidence & Self-Esteem</h3>
                        <div class="meditation-list">
                            <div class="meditation-item">
                                <h4>👑 Inner Strength (14 min)</h4>
                                <p>Connect with your inner power and confidence.</p>
                                <button onclick="playMeditation('inner-strength')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🌟 Self-Compassion (16 min)</h4>
                                <p>Practice loving-kindness toward yourself.</p>
                                <button onclick="playMeditation('self-compassion')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🏆 Achievement Visualization (10 min)</h4>
                                <p>Visualize success and build confidence for challenges.</p>
                                <button onclick="playMeditation('achievement')">🎧 Play</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-section">
                        <h3>🎯 Focus & Mindfulness</h3>
                        <div class="meditation-list">
                            <div class="meditation-item">
                                <h4>🕯️ Candle Flame Focus (7 min)</h4>
                                <p>Improve concentration with single-pointed focus.</p>
                                <button onclick="playMeditation('candle-focus')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🍃 Present Moment (11 min)</h4>
                                <p>Ground yourself in the here and now.</p>
                                <button onclick="playMeditation('present-moment')">🎧 Play</button>
                            </div>
                            <div class="meditation-item">
                                <h4>🧠 Mind Clarity (13 min)</h4>
                                <p>Clear mental fog and enhance focus.</p>
                                <button onclick="playMeditation('mind-clarity')">🎧 Play</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="meditation-info">
                    <h3>💡 Meditation Tips</h3>
                    <ul>
                        <li>Find a quiet, comfortable space</li>
                        <li>Use headphones for the best experience</li>
                        <li>Start with shorter sessions and gradually increase</li>
                        <li>It's normal for your mind to wander - gently return focus</li>
                        <li>Practice regularly for best results</li>
                    </ul>
                    
                    <div class="external-meditation-links">
                        <h4>🔗 More Meditation Resources:</h4>
                        <a href="https://www.headspace.com" target="_blank">🧠 Headspace</a>
                        <a href="https://www.calm.com" target="_blank">😌 Calm</a>
                        <a href="https://insighttimer.com" target="_blank">⏰ Insight Timer</a>
                        <a href="https://www.mindful.org" target="_blank">🌱 Mindful.org</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(meditationModal);
    setupModalClose(meditationModal);
}

function playMeditation(meditationType) {
    alert(`🧘 Starting meditation: ${meditationType}. In a real implementation, this would begin guided audio meditation.`);
}
// 📰 Recent Breakthrough in Depression Treatment
function showDepressionBreakthrough() {
    const breakthroughModal = document.createElement('div');
    breakthroughModal.className = 'resource-modal';
    breakthroughModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>📰 Recent Breakthrough in Depression Treatment</h2>
            <div class="research-content">
                <div class="article-header">
                    <p><strong>Published:</strong> January 2025 | <strong>Source:</strong> Journal of Clinical Psychology</p>
                    <p><strong>Research Team:</strong> Stanford University & Johns Hopkins Medical Center</p>
                </div>
                
                <div class="research-summary">
                    <h3>🔬 Key Findings</h3>
                    <p>A groundbreaking study involving 1,200 participants shows that combining traditional cognitive behavioral therapy (CBT) with new digital biomarker monitoring increases treatment success rates by 65%.</p>
                    
                    <h4>💡 What's New:</h4>
                    <ul>
                        <li><strong>Digital Biomarkers:</strong> Smartphone sensors track sleep, activity, and speech patterns</li>
                        <li><strong>AI-Assisted Therapy:</strong> Machine learning helps therapists personalize treatment in real-time</li>
                        <li><strong>Predictive Analytics:</strong> System can predict depressive episodes 2-3 weeks in advance</li>
                        <li><strong>Continuous Monitoring:</strong> 24/7 passive data collection without patient burden</li>
                    </ul>
                </div>
                
                <div class="research-details">
                    <h3>📊 Study Results</h3>
                    <div class="results-grid">
                        <div class="result-item">
                            <h4>Traditional CBT Alone</h4>
                            <p class="stat">45% improvement rate</p>
                            <p>Standard 12-week therapy program</p>
                        </div>
                        <div class="result-item">
                            <h4>CBT + Digital Biomarkers</h4>
                            <p class="stat">74% improvement rate</p>
                            <p>Enhanced therapy with real-time data</p>
                        </div>
                        <div class="result-item">
                            <h4>Relapse Prevention</h4>
                            <p class="stat">83% reduction</p>
                            <p>In depressive episode recurrence</p>
                        </div>
                    </div>
                </div>
                
                <div class="implications">
                    <h3>🎯 What This Means for Treatment</h3>
                    <ul>
                        <li>More personalized therapy approaches</li>
                        <li>Earlier intervention before symptoms worsen</li>
                        <li>Better support between therapy sessions</li>
                        <li>Objective measurement of treatment progress</li>
                        <li>Reduced healthcare costs through prevention</li>
                    </ul>
                </div>
                
                <div class="availability">
                    <h3>⏰ When Will This Be Available?</h3>
                    <p>Clinical trials are expanding to 15 additional medical centers in 2025. The technology is expected to be available to patients through participating clinics by late 2025 to early 2026.</p>
                    
                    <div class="action-buttons">
                        <button onclick="alert('Clinical trial information would be provided')">🔬 Join Clinical Trial</button>
                        <button onclick="alert('Full research paper would open')">📄 Read Full Study</button>
                        <button onclick="alert('Expert interview would play')">🎙️ Researcher Interview</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(breakthroughModal);
    setupModalClose(breakthroughModal);
}

// 🔬 Exercise and Mental Health Study
function showExerciseStudy() {
    const exerciseModal = document.createElement('div');
    exerciseModal.className = 'resource-modal';
    exerciseModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🔬 Study: Exercise and Mental Health Connection</h2>
            <div class="research-content">
                <div class="study-header">
                    <p><strong>Published:</strong> December 2024 | <strong>Source:</strong> Nature Mental Health</p>
                    <p><strong>Lead Researcher:</strong> Dr. Elena Rodriguez, Harvard School of Public Health</p>
                    <p><strong>Participants:</strong> 8,300 adults across 12 countries</p>
                </div>
                
                <div class="study-overview">
                    <h3>🎯 Study Purpose</h3>
                    <p>This comprehensive meta-analysis examined the relationship between different types of physical activity and mental health outcomes, tracking participants for 5 years to understand long-term effects.</p>
                </div>
                
                <div class="key-findings">
                    <h3>🏆 Major Findings</h3>
                    
                    <div class="finding-item">
                        <h4>🏃‍♀️ Aerobic Exercise</h4>
                        <ul>
                            <li><strong>Depression:</strong> 43% reduction in symptoms with 150+ minutes/week</li>
                            <li><strong>Anxiety:</strong> 38% improvement with regular cardio</li>
                            <li><strong>Best activities:</strong> Running, cycling, swimming, brisk walking</li>
                        </ul>
                    </div>
                    
                    <div class="finding-item">
                        <h4>💪 Strength Training</h4>
                        <ul>
                            <li><strong>Self-esteem:</strong> 52% boost in confidence levels</li>
                            <li><strong>Stress resilience:</strong> 29% better stress management</li>
                            <li><strong>Optimal frequency:</strong> 2-3 sessions per week</li>
                        </ul>
                    </div>
                    
                    <div class="finding-item">
                        <h4>🧘‍♀️ Mind-Body Exercise</h4>
                        <ul>
                            <li><strong>Mindfulness:</strong> Yoga showed 61% improvement in present-moment awareness</li>
                            <li><strong>Emotional regulation:</strong> Tai Chi improved emotional control by 34%</li>
                            <li><strong>Sleep quality:</strong> 47% better sleep with regular practice</li>
                        </ul>
                    </div>
                </div>
                
                <div class="dosage-recommendations">
                    <h3>💊 Exercise "Prescription" for Mental Health</h3>
                    <div class="prescription-grid">
                        <div class="prescription-item">
                            <h4>For Depression</h4>
                            <p><strong>Type:</strong> Moderate aerobic exercise</p>
                            <p><strong>Duration:</strong> 30-45 minutes</p>
                            <p><strong>Frequency:</strong> 4-5 times per week</p>
                            <p><strong>Intensity:</strong> 60-70% max heart rate</p>
                        </div>
                        
                        <div class="prescription-item">
                            <h4>For Anxiety</h4>
                            <p><strong>Type:</strong> Mix of cardio + strength training</p>
                            <p><strong>Duration:</strong> 20-30 minutes</p>
                            <p><strong>Frequency:</strong> 3-4 times per week</p>
                            <p><strong>Focus:</strong> Consistency over intensity</p>
                        </div>
                        
                        <div class="prescription-item">
                            <h4>For Stress</h4>
                            <p><strong>Type:</strong> Yoga or walking in nature</p>
                            <p><strong>Duration:</strong> 20-60 minutes</p>
                            <p><strong>Frequency:</strong> Daily if possible</p>
                            <p><strong>Setting:</strong> Outdoors when weather permits</p>
                        </div>
                    </div>
                </div>
                
                <div class="mechanisms">
                    <h3>🧠 How Exercise Helps the Brain</h3>
                    <ul>
                        <li><strong>Neurochemistry:</strong> Increases dopamine, serotonin, and endorphins</li>
                        <li><strong>Neuroplasticity:</strong> Promotes growth of new brain cells</li>
                        <li><strong>Inflammation:</strong> Reduces chronic inflammation linked to depression</li>
                        <li><strong>Sleep:</strong> Improves sleep quality and circadian rhythms</li>
                        <li><strong>Self-efficacy:</strong> Builds confidence through achievement</li>
                    </ul>
                </div>
                
                <div class="practical-tips">
                    <h3>🎯 Getting Started: Evidence-Based Tips</h3>
                    <div class="tips-list">
                        <div class="tip-item">
                            <h4>Week 1-2: Foundation</h4>
                            <p>Start with 10-15 minute walks daily. Focus on consistency, not intensity.</p>
                        </div>
                        <div class="tip-item">
                            <h4>Week 3-4: Building</h4>
                            <p>Increase to 20-25 minutes. Add one strength training session.</p>
                        </div>
                        <div class="tip-item">
                            <h4>Week 5+: Maintenance</h4>
                            <p>Aim for study-recommended levels. Mix activities to prevent boredom.</p>
                        </div>
                    </div>
                    
                    <button onclick="alert('Personalized exercise plan would be created')">📋 Create My Exercise Plan</button>
                    <button onclick="alert('Fitness tracker integration info')">📱 Track with Apps</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(exerciseModal);
    setupModalClose(exerciseModal);
}

// 📈 Mental Health Statistics 2025
function showMentalHealthStats() {
    const statsModal = document.createElement('div');
    statsModal.className = 'resource-modal';
    statsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>📈 Mental Health Statistics 2025</h2>
            <div class="stats-content">
                <div class="stats-intro">
                    <p><strong>Data Sources:</strong> National Institute of Mental Health, WHO, American Psychological Association</p>
                    <p><strong>Last Updated:</strong> January 2025</p>
                </div>
                
                <div class="stat-category">
                    <h3>🌍 Global Mental Health Overview</h3>
                    <div class="stats-grid">
                        <div class="stat-box">
                            <div class="stat-number">1 in 4</div>
                            <div class="stat-label">People affected by mental health conditions globally</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">970M</div>
                            <div class="stat-label">People living with mental health disorders worldwide</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">$1 trillion</div>
                            <div class="stat-label">Annual economic impact of mental health conditions</div>
                        </div>
                    </div>
                </div>
                
                <div class="stat-category">
                    <h3>🇺🇸 United States Statistics</h3>
                    <div class="us-stats">
                        <div class="stat-section">
                            <h4>Adult Mental Health (Ages 18+)</h4>
                            <ul>
                                <li><strong>50.6 million adults</strong> (20.3%) experienced mental illness in 2024</li>
                                <li><strong>14.2 million adults</strong> (5.7%) had serious mental illness</li>
                                <li><strong>21 million adults</strong> (8.4%) had substance use disorders</li>
                                <li><strong>9.7 million adults</strong> (3.9%) had serious thoughts of suicide</li>
                            </ul>
                        </div>
                        
                        <div class="stat-section">
                            <h4>Youth Mental Health (Ages 12-17)</h4>
                            <ul>
                                <li><strong>9.7 million teens</strong> (31.9%) experienced mental health episodes</li>
                                <li><strong>2.9 million teens</strong> (11.5%) experienced major depressive episodes</li>
                                <li><strong>42% increase</strong> in teen mental health crises since 2019</li>
                                <li><strong>60%</strong> of teens did not receive mental health treatment</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="stat-category">
                    <h3>📊 Specific Conditions</h3>
                    <div class="condition-stats">
                        <div class="condition-item">
                            <h4>😰 Anxiety Disorders</h4>
                            <p><strong>40 million adults</strong> (18.1%) affected annually</p>
                            <p><strong>Most treatable</strong> mental health condition</p>
                            <p><strong>Only 36.9%</strong> receive treatment</p>
                        </div>
                        
                        <div class="condition-item">
                            <h4>😔 Depression</h4>
                            <p><strong>21 million adults</strong> (8.4%) had major depressive episode</p>
                            <p><strong>Leading cause</strong> of disability worldwide</p>
                            <p><strong>66%</strong> received treatment in 2024</p>
                        </div>
                        
                        <div class="condition-item">
                            <h4>🔄 Bipolar Disorder</h4>
                            <p><strong>4.4%</strong> of adults experience bipolar disorder</p>
                            <p><strong>83%</strong> of cases are classified as severe</p>
                            <p><strong>Average age of onset:</strong> 25 years old</p>
                        </div>
                        
                        <div class="condition-item">
                            <h4>⚡ PTSD</h4>
                            <p><strong>3.5%</strong> of adults experience PTSD annually</p>
                            <p><strong>9.7%</strong> will develop PTSD in their lifetime</p>
                            <p><strong>Women are 2x more likely</strong> to develop PTSD</p>
                        </div>
                    </div>
                </div>
                
                <div class="stat-category">
                    <h3>🏥 Treatment Access & Barriers</h3>
                    <div class="treatment-stats">
                        <h4>📈 Positive Trends</h4>
                        <ul>
                            <li><strong>23% increase</strong> in mental health treatment seeking since 2020</li>
                            <li><strong>156% growth</strong> in telehealth mental health services</li>
                            <li><strong>67%</strong> of employers now offer mental health benefits</li>
                            <li><strong>89%</strong> of insurance plans cover mental health treatment</li>
                        </ul>
                        
                        <h4>⚠️ Ongoing Challenges</h4>
                        <ul>
                            <li><strong>Mental health provider shortage:</strong> 6,500 additional providers needed</li>
                            <li><strong>Average wait time:</strong> 25-30 days for appointment</li>
                            <li><strong>Cost barriers:</strong> 45% report treatment too expensive</li>
                            <li><strong>Rural access:</strong> 65% of rural counties lack mental health providers</li>
                        </ul>
                    </div>
                </div>
                
                <div class="stat-category">
                    <h3>💰 Economic Impact</h3>
                    <div class="economic-stats">
                        <div class="economic-item">
                            <h4>Healthcare Costs</h4>
                            <p><strong>$280 billion</strong> annual direct healthcare costs</p>
                            <p><strong>$140 billion</strong> in lost productivity</p>
                        </div>
                        <div class="economic-item">
                            <h4>Return on Investment</h4>
                            <p><strong>$4 return</strong> for every $1 invested in mental health treatment</p>
                            <p><strong>52% reduction</strong> in overall healthcare costs with treatment</p>
                        </div>
                    </div>
                </div>
                
                <div class="action-section">
                    <h3>📞 Take Action</h3>
                    <div class="action-buttons">
                        <button onclick="alert('Local provider directory would open')">🔍 Find Local Providers</button>
                        <button onclick="alert('Insurance verification tool')">💳 Check Insurance Coverage</button>
                        <button onclick="alert('Mental health screening tool')">🔍 Take Screening</button>
                        <button onclick="showCrisisResources()">🆘 Crisis Resources</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(statsModal);
    setupModalClose(statsModal);
}

// 🏥 New Treatment Options
function showNewTreatments() {
    const treatmentModal = document.createElement('div');
    treatmentModal.className = 'resource-modal';
    treatmentModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>🏥 New Treatment Options Available</h2>
            <div class="treatment-content">
                <div class="treatment-intro">
                    <p>Mental health treatment continues to evolve with innovative approaches that offer new hope for recovery. Here are the latest evidence-based treatments now available.</p>
                </div>
                
                <div class="treatment-category">
                    <h3>🧠 Breakthrough Therapies</h3>
                    
                    <div class="treatment-item">
                        <h4>🌟 Ketamine-Assisted Psychotherapy (KAP)</h4>
                        <div class="treatment-details">
                            <p><strong>For:</strong> Treatment-resistant depression, severe anxiety, PTSD</p>
                            <p><strong>How it works:</strong> Low-dose ketamine creates neuroplasticity, allowing deeper therapeutic breakthroughs</p>
                            <p><strong>Success rate:</strong> 70-80% improvement in treatment-resistant cases</p>
                            <p><strong>Availability:</strong> FDA-approved, available at specialized clinics</p>
                            <div class="treatment-pros-cons">
                                <div class="pros">
                                    <h5>✅ Benefits:</h5>
                                    <ul>
                                        <li>Rapid results (often within hours/days)</li>
                                        <li>Effective when other treatments haven't worked</li>
                                        <li>Can break through psychological barriers</li>
                                    </ul>
                                </div>
                                <div class="cons">
                                    <h5>⚠️ Considerations:</h5>
                                    <ul>
                                        <li>Requires medical supervision</li>
                                        <li>Not covered by all insurance plans</li>
                                        <li>Multiple sessions typically needed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="treatment-item">
                        <h4>⚡ Transcranial Magnetic Stimulation (TMS)</h4>
                        <div class="treatment-details">
                            <p><strong>For:</strong> Depression, OCD, anxiety disorders</p>
                            <p><strong>How it works:</strong> Magnetic fields stimulate specific brain regions</p>
                            <p><strong>Success rate:</strong> 50-60% remission rate for depression</p>
                            <p><strong>Availability:</strong> FDA-approved, outpatient procedure</p>
                            <div class="treatment-pros-cons">
                                <div class="pros">
                                    <h5>✅ Benefits:</h5>
                                    <ul>
                                        <li>Non-invasive, no anesthesia needed</li>
                                        <li>Minimal side effects</li>
                                        <li>Can return to daily activities immediately</li>
                                    </ul>
                                </div>
                                <div class="cons">
                                    <h5>⚠️ Considerations:</h5>
                                    <ul>
                                        <li>Requires daily sessions for 4-6 weeks</li>
                                        <li>May cause mild headaches</li>
                                        <li>Not suitable for those with metal implants in head</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="treatment-item">
                        <h4>🎮 Virtual Reality Therapy (VRT)</h4>
                        <div class="treatment-details">
                            <p><strong>For:</strong> PTSD, phobias, anxiety disorders, addiction</p>
                            <p><strong>How it works:</strong> Immersive environments for exposure therapy and skill practice</p>
                            <p><strong>Success rate:</strong> 85% effectiveness for specific phobias</p>
                            <p><strong>Availability:</strong> Growing number of clinics offering VRT</p>
                            <div class="treatment-pros-cons">
                                <div class="pros">
                                    <h5>✅ Benefits:</h5>
                                    <ul>
                                        <li>Safe environment for exposure therapy</li>
                                        <li>Highly engaging and motivating</li>
                                        <li>Customizable scenarios</li>
                                    </ul>
                                </div>
                                <div class="cons">
                                    <h5>⚠️ Considerations:</h5>
                                    <ul>
                                        <li>Limited availability</li>
                                        <li>May cause motion sickness in some</li>
                                        <li>Requires specialized equipment</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="treatment-category">
                    <h3>💊 Innovative Medications</h3>
                    
                    <div class="medication-item">
                        <h4>🌿 Psilocybin-Assisted Therapy</h4>
                        <p><strong>Status:</strong> FDA Breakthrough Therapy designation for depression</p>
                        <p><strong>Current availability:</strong> Clinical trials, compassionate use programs</p>
                        <p><strong>Expected approval:</strong> 2025-2026</p>
                    </div>
                    
                    <div class="medication-item">
                        <h4>🧬 Personalized Pharmacogenomics</h4>
                        <p><strong>What it is:</strong> Genetic testing to determine optimal medications</p>
                        <p><strong>Availability:</strong> Now available through many providers</p>
                        <p><strong>Benefit:</strong> Reduces trial-and-error with medications</p>
                    </div>
                </div>
                
                <div class="treatment-category">
                    <h3>📱 Digital Therapeutics</h3>
                    
                    <div class="digital-item">
                        <h4>🤖 AI-Powered Therapy Apps</h4>
                        <ul>
                            <li><strong>Woebot:</strong> FDA-approved for depression and anxiety</li>
                            <li><strong>Ginger:</strong> On-demand mental health coaching</li>
                            <li><strong>Wysa:</strong> AI companion for emotional support</li>
                        </ul>
                    </div>
                    
                    <div class="digital-item">
                        <h4>🩺 Digital Biomarker Monitoring</h4>
                        <p>Smartphone sensors track mood, sleep, and activity patterns to predict and prevent mental health episodes.</p>
                    </div>
                </div>
                
                <div class="treatment-category">
                    <h3>🔬 Precision Medicine Approaches</h3>
                    
                    <div class="precision-item">
                        <h4>🧪 Biomarker Testing</h4>
                        <p>Blood tests that can help diagnose depression and predict treatment response.</p>
                    </div>
                    
                    <div class="precision-item">
                        <h4>🧠 Brain Imaging-Guided Treatment</h4>
                        <p>Using fMRI and other brain scans to personalize therapy approaches.</p>
                    </div>
                </div>
                
                <div class="availability-section">
                    <h3>🗺️ Finding New Treatments</h3>
                    <div class="find-treatment">
                        <h4>How to Access These Treatments:</h4>
                        <ol>
                            <li><strong>Consult your mental health provider</strong> about new options</li>
                            <li><strong>Research clinical trials</strong> at ClinicalTrials.gov</li>
                            <li><strong>Contact specialized treatment centers</strong> in your area</li>
                            <li><strong>Verify insurance coverage</strong> for innovative treatments</li>
                        </ol>
                        
                        <div class="action-buttons">
                            <button onclick="alert('Treatment finder tool would open')">🔍 Find Nearby Providers</button>
                            <button onclick="alert('Clinical trial search would open')">🧪 Search Clinical Trials</button>
                            <button onclick="alert('Insurance verification tool')">💳 Check Coverage</button>
                            <button onclick="alert('Appointment scheduling would open')">📅 Schedule Consultation</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(treatmentModal);
    setupModalClose(treatmentModal);
}