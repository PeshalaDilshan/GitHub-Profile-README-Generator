// App state
const appState = {
    selectedSkills: new Set(),
    customSkills: new Set()
};

// Skills data
const skillsData = {
    "Programming Languages": ["JavaScript", "Python", "Java", "C++", "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby", "TypeScript", "C#"],
    "Frontend Development": ["React", "Vue", "Angular", "Svelte", "Next.js", "Gatsby", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "SASS", "Webpack"],
    "Backend Development": ["Node.js", "Express", "Django", "Flask", "Spring", ".NET", "Ruby on Rails", "Laravel", "FastAPI", "NestJS"],
    "Mobile App Development": ["React Native", "Flutter", "SwiftUI", "Android SDK", "Kotlin Multiplatform", "Xamarin", "Ionic"],
    "AI/ML": ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "OpenCV", "Pandas", "Numpy", "Matplotlib", "Seaborn"],
    "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Cassandra", "SQLite", "Elasticsearch", "Firebase", "Supabase"],
    "DevOps": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Jenkins", "Terraform", "Ansible", "GitHub Actions", "CircleCI", "GitLab CI"],
    "Testing": ["Jest", "Cypress", "Selenium", "Mocha", "PyTest", "JUnit", "Testing Library", "Jasmine", "Karma"],
    "Software": ["VS Code", "IntelliJ", "Photoshop", "Figma", "Git", "Docker", "Postman", "Jira", "Confluence", "Slack"],
    "Game Development": ["Unity", "Unreal Engine", "Godot", "Phaser", "Three.js"],
    "Other": ["GraphQL", "REST APIs", "Microservices", "Blockchain", "Web3", "Socket.IO", "OAuth", "JWT"]
};

// Social media data
const socialData = [
    { name: "GitHub", icon: "github", placeholder: "username", baseUrl: "https://github.com/" },
    { name: "Twitter", icon: "twitter", placeholder: "username", baseUrl: "https://twitter.com/" },
    { name: "LinkedIn", icon: "linkedin", placeholder: "username", baseUrl: "https://linkedin.com/in/" },
    { name: "Dev.to", icon: "dev", placeholder: "username", baseUrl: "https://dev.to/" },
    { name: "CodePen", icon: "codepen", placeholder: "username", baseUrl: "https://codepen.io/" },
    { name: "CodeSandbox", icon: "code", placeholder: "username", baseUrl: "https://codesandbox.io/u/" },
    { name: "Stack Overflow", icon: "stack-overflow", placeholder: "user-id", baseUrl: "https://stackoverflow.com/users/" },
    { name: "Kaggle", icon: "kaggle", placeholder: "username", baseUrl: "https://kaggle.com/" },
    { name: "Medium", icon: "medium", placeholder: "username", baseUrl: "https://medium.com/@" },
    { name: "YouTube", icon: "youtube", placeholder: "channel-id", baseUrl: "https://youtube.com/channel/" },
    { name: "Facebook", icon: "facebook", placeholder: "username", baseUrl: "https://facebook.com/" },
    { name: "Instagram", icon: "instagram", placeholder: "username", baseUrl: "https://instagram.com/" },
    { name: "Dribbble", icon: "dribbble", placeholder: "username", baseUrl: "https://dribbble.com/" },
    { name: "Behance", icon: "behance", placeholder: "username", baseUrl: "https://behance.net/" },
    { name: "Hashnode", icon: "hashnode", placeholder: "username", baseUrl: "https://hashnode.com/@" },
    { name: "CodeChef", icon: "utensils", placeholder: "username", baseUrl: "https://codechef.com/users/" },
    { name: "HackerRank", icon: "hackerrank", placeholder: "username", baseUrl: "https://hackerrank.com/" },
    { name: "LeetCode", icon: "leetcode", placeholder: "username", baseUrl: "https://leetcode.com/" },
    { name: "Discord", icon: "discord", placeholder: "username", baseUrl: "" },
    { name: "RSS", icon: "rss", placeholder: "feed-url", baseUrl: "" }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    populateSkills();
    populateSocialInputs();
    setupEventListeners();
});

// Initialize animations
function initAnimations() {
    // Initialize GSAP animations for elements
    gsap.to(".animate-in", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
    });
    
    // Animate GitHub icon with GSAP
    gsap.to("#github-icon", {
        y: -10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// Populate skills in the UI
function populateSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    for (const [category, skills] of Object.entries(skillsData)) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'col-span-full';
        categoryElement.innerHTML = `
            <h3 class="text-sm font-semibold text-slate-600 mt-4 mb-2 pl-2 border-l-4 border-blue-400">${category}</h3>
        `;
        skillsContainer.appendChild(categoryElement);
        
        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-chip flex items-center p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50';
            skillElement.innerHTML = `
                <input type="checkbox" id="skill-${skill}" class="mr-2 h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-200 hidden" data-category="${category}">
                <label for="skill-${skill}" class="cursor-pointer flex items-center text-slate-700">
                    <span>${skill}</span>
                </label>
            `;
            skillsContainer.appendChild(skillElement);
            
            // Add click event to toggle skill selection
            skillElement.addEventListener('click', function() {
                const checkbox = this.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked) {
                    this.classList.add('bg-blue-100', 'border-blue-400');
                    appState.selectedSkills.add(skill);
                } else {
                    this.classList.remove('bg-blue-100', 'border-blue-400');
                    appState.selectedSkills.delete(skill);
                }
            });
        });
    }
}

// Populate social media inputs
function populateSocialInputs() {
    const socialContainer = document.getElementById('socialContainer');
    socialData.forEach(social => {
        const socialElement = document.createElement('div');
        socialElement.className = 'social-input-container';
        socialElement.innerHTML = `
            <i class="fab fa-${social.icon} text-blue-500"></i>
            <input type="text" placeholder="${social.name} ${social.placeholder}" 
                class="social-input flex-grow p-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" 
                data-platform="${social.name.toLowerCase()}" data-baseurl="${social.baseUrl}">
        `;
        socialContainer.appendChild(socialElement);
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Add custom skill functionality
    document.getElementById('addSkillBtn').addEventListener('click', addCustomSkill);
    
    // Fetch GitHub data with loading indicator
    document.getElementById('fetchGitHub').addEventListener('click', fetchGitHubData);
    
    // Skill search functionality
    document.getElementById('skillSearch').addEventListener('input', searchSkills);
    
    // Clear skills functionality
    document.getElementById('clearSkills').addEventListener('click', clearSkills);
    
    // Clear social functionality
    document.getElementById('clearSocial').addEventListener('click', clearSocial);
    
    // Clear addons functionality
    document.getElementById('clearAddons').addEventListener('click', clearAddons);
    
    // Reset button functionality
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    
    // Generate button functionality
    document.getElementById('generateBtn').addEventListener('click', generateREADME);
    
    // Copy button functionality
    document.getElementById('copyBtn').addEventListener('click', copyToClipboardHandler);
    
    // Download button functionality
    document.getElementById('downloadBtn').addEventListener('click', downloadMarkdownHandler);
    
    // Modal functionality
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    document.getElementById('copyModalBtn').addEventListener('click', copyModalContent);
    
    document.getElementById('downloadModalBtn').addEventListener('click', downloadModalContent);
    
    // Export functionality
    document.getElementById('exportBtn').addEventListener('click', exportConfiguration);
    
    // Import functionality
    document.getElementById('importBtn').addEventListener('click', importConfigurationHandler);
}

// Add custom skill
function addCustomSkill() {
    const customSkillInput = document.getElementById('customSkillInput');
    const skillName = customSkillInput.value.trim();
    const skillsContainer = document.getElementById('skillsContainer');
    
    if (skillName) {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-chip flex items-center p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50';
        skillElement.innerHTML = `
            <input type="checkbox" id="skill-${skillName}" class="mr-2 h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-200 hidden" data-category="Custom" checked>
            <label for="skill-${skillName}" class="cursor-pointer flex items-center text-slate-700">
                <span>${skillName}</span>
            </label>
        `;
        
        skillsContainer.appendChild(skillElement);
        
        // Add click event to toggle skill selection
        skillElement.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                this.classList.add('bg-blue-100', 'border-blue-400');
                appState.customSkills.add(skillName);
            } else {
                this.classList.remove('bg-blue-100', 'border-blue-400');
                appState.customSkills.delete(skillName);
            }
        });
        
        // Select the skill by default
        skillElement.classList.add('bg-blue-100', 'border-blue-400');
        appState.customSkills.add(skillName);
        
        customSkillInput.value = '';
    }
}

// Fetch GitHub user data
function fetchGitHubData() {
    const username = document.getElementById('githubUsername').value.trim();
    if (username) {
        const button = this;
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading-spinner"></span> Fetching...';
        button.disabled = true;
        
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => {
                // Fill the form with GitHub data
                document.getElementById('nameInput').value = data.name || '';
                document.getElementById('bioInput').value = data.bio || '';
                document.getElementById('locationInput').value = data.location || '';
                document.getElementById('companyInput').value = data.company || '';
                document.getElementById('websiteInput').value = data.blog || '';
                
                // Set GitHub social input
                document.querySelector('.social-input[data-platform="github"]').value = username;
                
                // Show success message
                showNotification(`Successfully fetched data for ${username}`, 'success');
                
                // Restore button
                button.innerHTML = originalText;
                button.disabled = false;
            })
            .catch(error => {
                showNotification(`Error: ${error.message}`, 'error');
                
                // Restore button
                button.innerHTML = originalText;
                button.disabled = false;
            });
    } else {
        showNotification('Please enter a GitHub username', 'error');
    }
}

// Search skills
function searchSkills(e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.skill-chip').forEach(chip => {
        const skillName = chip.querySelector('span').textContent.toLowerCase();
        chip.style.display = skillName.includes(searchTerm) ? 'flex' : 'none';
    });
    
    // Show category headers if any skills in that category are visible
    document.querySelectorAll('h3').forEach(header => {
        const category = header.textContent;
        const hasVisibleSkills = Array.from(header.nextElementSibling ? header.parentNode.children : [])
            .some(el => el.classList.contains('skill-chip') && el.style.display !== 'none');
        
        header.style.display = hasVisibleSkills ? 'block' : 'none';
    });
}

// Clear all skills
function clearSkills() {
    document.querySelectorAll('#skillsContainer input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.skill-chip').classList.remove('bg-blue-100', 'border-blue-400');
    });
    appState.selectedSkills.clear();
    appState.customSkills.clear();
    
    // Remove custom skills
    document.querySelectorAll('.skill-chip').forEach(chip => {
        if (chip.querySelector('input').dataset.category === 'Custom') {
            chip.remove();
        }
    });
}

// Clear social inputs
function clearSocial() {
    document.querySelectorAll('.social-input').forEach(input => {
        input.value = '';
    });
}

// Clear addons
function clearAddons() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Reset all form data
function resetAll() {
    if (confirm('Are you sure you want to reset everything? This cannot be undone.')) {
        // Clear all inputs
        document.querySelectorAll('input, textarea').forEach(input => {
            if (input.type !== 'button' && input.type !== 'submit') {
                input.value = '';
            }
        });
        
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Remove custom skills
        document.querySelectorAll('.skill-chip').forEach(chip => {
            if (chip.querySelector('input').dataset.category === 'Custom') {
                chip.remove();
            } else {
                chip.classList.remove('bg-blue-100', 'border-blue-400');
            }
        });
        
        // Reset app state
        appState.selectedSkills.clear();
        appState.customSkills.clear();
        
        // Reset preview
        document.getElementById('previewContent').innerHTML = `
            <div class="text-center py-12 text-slate-400">
                <i class="fas fa-code text-5xl mb-4 opacity-50"></i>
                <p class="text-lg">Your README preview will appear here</p>
                <p class="text-sm mt-2">Click "Generate README" to create your profile</p>
            </div>
        `;
        
        showNotification('All data has been reset', 'success');
    }
}

// Handle copy to clipboard
function copyToClipboardHandler() {
    const markdownContent = document.getElementById('markdownContent');
    if (markdownContent.textContent.trim() === '') {
        showNotification('Please generate README first', 'error');
        return;
    }
    
    copyToClipboard(markdownContent.textContent);
    
    const button = this;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
    button.classList.remove('btn-secondary');
    button.classList.add('btn-success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.add('btn-secondary');
        button.classList.remove('btn-success');
    }, 2000);
    
    showNotification('Copied to clipboard!', 'success');
}

// Handle download markdown
function downloadMarkdownHandler() {
    const markdownContent = document.getElementById('markdownContent');
    if (markdownContent.textContent.trim() === '') {
        showNotification('Please generate README first', 'error');
        return;
    }
    
    downloadMarkdown();
}

// Close modal
function closeModal() {
    document.getElementById('markdownModal').classList.add('hidden');
}

// Copy modal content
function copyModalContent() {
    copyToClipboard(document.getElementById('markdownContent').textContent);
    
    const button = this;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
    button.classList.remove('btn-secondary');
    button.classList.add('btn-success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.add('btn-secondary');
        button.classList.remove('btn-success');
    }, 2000);
    
    showNotification('Copied to clipboard!', 'success');
}

// Download modal content
function downloadModalContent() {
    downloadMarkdown();
    document.getElementById('markdownModal').classList.add('hidden');
}

// Handle import configuration
function importConfigurationHandler() {
    // Create file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const config = JSON.parse(e.target.result);
                    importConfiguration(config);
                    showNotification('Configuration imported successfully!', 'success');
                } catch (error) {
                    showNotification('Error importing configuration: Invalid file format', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    fileInput.click();
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = 'notification ' + type;
    notification.classList.remove('hidden');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Export configuration
function exportConfiguration() {
    // Get all form data
    const config = {
        personalInfo: {
            name: document.getElementById('nameInput').value,
            bio: document.getElementById('bioInput').value,
            location: document.getElementById('locationInput').value,
            company: document.getElementById('companyInput').value,
            website: document.getElementById('websiteInput').value
        },
        skills: Array.from(document.querySelectorAll('#skillsContainer input[type="checkbox"]:checked')).map(checkbox => {
            return {
                name: checkbox.id.replace('skill-', ''),
                category: checkbox.dataset.category
            };
        }),
        social: Array.from(document.querySelectorAll('.social-input')).map(input => {
            return {
                platform: input.dataset.platform,
                value: input.value
            };
        }).filter(item => item.value),
        addons: {
            githubStats: document.getElementById('githubStats').checked,
            githubStreak: document.getElementById('githubStreak').checked,
            githubTrophies: document.getElementById('githubTrophies').checked,
            visitorBadge: document.getElementById('visitorBadge').checked,
            buyMeCoffee: document.getElementById('buyMeCoffee').checked,
            koFi: document.getElementById('koFi').checked
        }
    };
    
    // Create and download JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "github-profile-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    showNotification('Configuration exported successfully!', 'success');
}

// Import configuration
function importConfiguration(config) {
    // Set personal info
    if (config.personalInfo) {
        document.getElementById('nameInput').value = config.personalInfo.name || '';
        document.getElementById('bioInput').value = config.personalInfo.bio || '';
        document.getElementById('locationInput').value = config.personalInfo.location || '';
        document.getElementById('companyInput').value = config.personalInfo.company || '';
        document.getElementById('websiteInput').value = config.personalInfo.website || '';
    }
    
    // Clear all skills first
    document.querySelectorAll('#skillsContainer input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.skill-chip').classList.remove('bg-blue-100', 'border-blue-400');
    });
    
    // Set skills
    if (config.skills && Array.isArray(config.skills)) {
        config.skills.forEach(skill => {
            let checkbox = document.getElementById(`skill-${skill.name}`);
            
            // If skill doesn't exist, add it as a custom skill
            if (!checkbox) {
                const customSkillInput = document.getElementById('customSkillInput');
                customSkillInput.value = skill.name;
                document.getElementById('addSkillBtn').click();
                checkbox = document.getElementById(`skill-${skill.name}`);
            }
            
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest('.skill-chip').classList.add('bg-blue-100', 'border-blue-400');
                
                if (skill.category === 'Custom') {
                    appState.customSkills.add(skill.name);
                } else {
                    appState.selectedSkills.add(skill.name);
                }
            }
        });
    }
    
    // Set social links
    if (config.social && Array.isArray(config.social)) {
        document.querySelectorAll('.social-input').forEach(input => {
            const platform = input.dataset.platform;
            const socialItem = config.social.find(item => item.platform === platform);
            input.value = socialItem ? socialItem.value : '';
        });
    }
    
    // Set addons
    if (config.addons) {
        document.getElementById('githubStats').checked = config.addons.githubStats || false;
        document.getElementById('githubStreak').checked = config.addons.githubStreak || false;
        document.getElementById('githubTrophies').checked = config.addons.githubTrophies || false;
        document.getElementById('visitorBadge').checked = config.addons.visitorBadge || false;
        document.getElementById('buyMeCoffee').checked = config.addons.buyMeCoffee || false;
        document.getElementById('koFi').checked = config.addons.koFi || false;
    }
    
    // Regenerate preview
    generateREADME();
}

// Generate README
function generateREADME() {
    // Get personal info
    const name = document.getElementById('nameInput').value || 'Your Name';
    const bio = document.getElementById('bioInput').value || 'Your Bio';
    const location = document.getElementById('locationInput').value || '';
    const company = document.getElementById('companyInput').value || '';
    const website = document.getElementById('websiteInput').value || '';
    
    // Get selected skills by category
    const skillsByCategory = {};
    document.querySelectorAll('.skill-chip input[type="checkbox"]:checked').forEach(checkbox => {
        const category = checkbox.dataset.category;
        const skill = checkbox.id.replace('skill-', '');
        
        if (!skillsByCategory[category]) {
            skillsByCategory[category] = [];
        }
        
        skillsByCategory[category].push(skill);
    });
    
    // Get social links
    const socialLinks = [];
    document.querySelectorAll('.social-input').forEach(input => {
        if (input.value.trim() !== '') {
            const platform = input.dataset.platform;
            const baseUrl = input.dataset.baseurl;
            const username = input.value.trim();
            
            socialLinks.push({
                platform,
                url: baseUrl ? `${baseUrl}${username}` : username,
                username
            });
        }
    });
    
    // Get add-ons
    const addOns = {
        githubStats: document.getElementById('githubStats').checked,
        githubStreak: document.getElementById('githubStreak').checked,
        githubTrophies: document.getElementById('githubTrophies').checked,
        visitorBadge: document.getElementById('visitorBadge').checked,
        buyMeCoffee: document.getElementById('buyMeCoffee').checked,
        koFi: document.getElementById('koFi').checked
    };
    
    // Generate markdown
    let markdown = `# ${name}\n\n`;
    markdown += `## ${bio}\n\n`;
    
    if (location) markdown += `📍 ${location} | `;
    if (company) markdown += `💼 ${company} | `;
    if (website) markdown += `🌐 [Website](${website})`;
    markdown += '\n\n';
    
    // Add badges
    markdown += `### 🔧 Technologies & Tools\n\n`;
    for (const [category, skills] of Object.entries(skillsByCategory)) {
        if (skills.length > 0) {
            markdown += `#### ${category}\n\n`;
            skills.forEach(skill => {
                markdown += `![${skill}](https://img.shields.io/badge/-${encodeURIComponent(skill)}-000?style=flat-square&logo=${encodeURIComponent(skill.toLowerCase())}&logoColor=white) `;
            });
            markdown += '\n\n';
        }
    }
    
    // Add social links
    if (socialLinks.length > 0) {
        markdown += `### 🌐 Socials\n\n`;
        socialLinks.forEach(link => {
            markdown += `[![${link.platform}](https://img.shields.io/badge/${link.platform}-000?style=for-the-badge&logo=${link.platform}&logoColor=white)](${link.url})\n\n`;
        });
    }
    
    // Add GitHub stats
    const githubUsername = document.querySelector('.social-input[data-platform="github"]').value;
    if (githubUsername && (addOns.githubStats || addOns.githubStreak || addOns.githubTrophies)) {
        markdown += `### 📊 GitHub Stats\n\n`;
        
        if (addOns.githubStats) {
            markdown += `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=radical)\n\n`;
        }
        
        if (addOns.githubStreak) {
            markdown += `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=radical)\n\n`;
        }
        
        if (addOns.githubTrophies) {
            markdown += `![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=radical)\n\n`;
        }
    }
    
    // Add visitor badge
    if (addOns.visitorBadge && githubUsername) {
        markdown += `![Visitor Count](https://visitor-badge.laobi.icu/badge?page=${githubUsername}.${githubUsername})\n\n`;
    }
    
    // Add support badges
    if (addOns.buyMeCoffee || addOns.koFi) {
        markdown += `### 💖 Support\n\n`;
        
        if (addOns.buyMeCoffee) {
            markdown += `[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/USERNAME)\n\n`;
        }
        
        if (addOns.koFi) {
            markdown += `[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/USERNAME)\n\n`;
        }
    }
    
    // Update preview
    updatePreview(name, bio, location, company, website, skillsByCategory, socialLinks, addOns);
    
    // Show markdown in modal
    document.getElementById('markdownContent').textContent = markdown;
    document.getElementById('markdownModal').classList.remove('hidden');
}

// Update preview
function updatePreview(name, bio, location, company, website, skillsByCategory, socialLinks, addOns) {
    const githubUsername = document.querySelector('.social-input[data-platform="github"]').value;
    
    document.getElementById('previewContent').innerHTML = `
        <h1 class="text-2xl font-bold mb-2 text-slate-800">${name}</h1>
        <h2 class="text-xl text-slate-600 mb-4">${bio}</h2>
        <div class="flex flex-wrap items-center gap-2 mb-6 text-slate-700">
            ${location ? `<span>📍 ${location}</span>` : ''}
            ${company ? `<span>💼 ${company}</span>` : ''}
            ${website ? `<span>🌐 <a href="${website}" class="text-blue-500 hover:underline">${website}</a></span>` : ''}
        </div>
        
        <h3 class="text-lg font-bold mt-6 mb-3 text-slate-800">Technologies & Tools</h3>
        <div class="mb-6">
            ${Object.entries(skillsByCategory).map(([category, skills]) => `
                ${skills.length > 0 ? `
                    <h4 class="font-medium mt-4 mb-2 text-slate-700">${category}</h4>
                    <div class="flex flex-wrap gap-2 mb-3">
                        ${skills.map(skill => `
                            <span class="badge bg-blue-100 text-blue-800">${skill}</span>
                        `).join('')}
                    </div>
                ` : ''}
            `).join('')}
        </div>
        
        ${socialLinks.length > 0 ? `
            <h3 class="text-lg font-bold mt-6 mb-3 text-slate-800">Socials</h3>
            <div class="flex flex-wrap gap-3 mb-6">
                ${socialLinks.map(link => `
                    <a href="${link.url}" class="px-3 py-1 bg-slate-100 rounded text-slate-700 text-sm hover:bg-slate-200 transition">${link.platform}</a>
                `).join('')}
            </div>
        ` : ''}
        
        ${githubUsername && (addOns.githubStats || addOns.githubStreak || addOns.githubTrophies) ? `
            <h3 class="text-lg font-bold mt-6 mb-3 text-slate-800">GitHub Stats</h3>
            <div class="github-stats p-4 rounded-lg text-white mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${addOns.githubStats ? `
                        <div class="p-3 bg-blue-900 bg-opacity-30 rounded">
                            <p class="text-sm opacity-80">GitHub Stats</p>
                            <p class="text-xl font-bold">Would appear here</p>
                        </div>
                    ` : ''}
                    ${addOns.githubStreak ? `
                        <div class="p-3 bg-blue-900 bg-opacity-30 rounded">
                            <p class="text-sm opacity-80">Streak Stats</p>
                            <p class="text-xl font-bold">Would appear here</p>
                        </div>
                    ` : ''}
                    ${addOns.githubTrophies ? `
                        <div class="p-3 bg-blue-900 bg-opacity-30 rounded col-span-full">
                            <p class="text-sm opacity-80">GitHub Trophies</p>
                            <p class="text-xl font-bold">Would appear here</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        ` : ''}
        
        ${addOns.visitorBadge && githubUsername ? `
            <div class="mb-4">
                <span class="badge bg-green-100 text-green-800">Visitor Count: Would appear here</span>
            </div>
        ` : ''}
        
        ${addOns.buyMeCoffee || addOns.koFi ? `
            <h3 class="text-lg font-bold mt-6 mb-3 text-slate-800">Support</h3>
            <div class="flex flex-wrap gap-3 mb-6">
                ${addOns.buyMeCoffee ? `
                    <span class="badge bg-yellow-100 text-yellow-800">Buy Me a Coffee</span>
                ` : ''}
                ${addOns.koFi ? `
                    <span class="badge bg-pink-100 text-pink-800">Ko-fi</span>
                ` : ''}
            </div>
        ` : ''}
    `;
}

// Copy to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Download markdown
function downloadMarkdown() {
    const markdown = document.getElementById('markdownContent').textContent;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showNotification('README.md downloaded successfully!', 'success');
}