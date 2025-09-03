// script.js
// GitHub Profile README Generator with all original features
class GitHubProfileGenerator {
    constructor() {
        this.init();
    }

    init() {
        // Animate GitHub icon
        gsap.to('#github-icon', {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });

        // Animate skill sections
        gsap.utils.toArray('.skill-section').forEach((element, i) => {
            gsap.from(element, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: i * 0.1,
                ease: "power2.out"
            });
        });

        // Setup event listeners
        this.setupEventListeners();
        this.generatePreview();
    }

    setupEventListeners() {
        // Input handling
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.generatePreview());
        });

        // Checkbox handling
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.generatePreview());
        });

        // Button event listeners
        document.getElementById('copy-btn').addEventListener('click', () => this.copyMarkdown());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetForm());
        document.getElementById('export-btn').addEventListener('click', () => this.exportData());
        document.getElementById('import-btn').addEventListener('click', () => {
            document.getElementById('import-input').click();
        });
        document.getElementById('import-input').addEventListener('change', (event) => this.importData(event));
    }

    updateTags(fieldId, tagsContainerId) {
        const input = document.getElementById(fieldId);
        const tagsContainer = document.getElementById(tagsContainerId);
        
        if (!input || !tagsContainer) return;
        
        const values = input.value.split(',').map(item => item.trim()).filter(item => item);
        tagsContainer.innerHTML = '';
        
        values.forEach(value => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = value;
            tagsContainer.appendChild(tag);
        });
    }

    generateMarkdown() {
        // Update all tags
        const tagFields = [
            'skills', 'programming-languages', 'frontend', 'backend', 'mobile',
            'ai-ml', 'database', 'data-visualization', 'devops', 'baas',
            'framework', 'testing', 'software', 'static-site', 'game-engines',
            'automation', 'other'
        ];
        
        tagFields.forEach(field => {
            this.updateTags(field, `${field}-tags`);
        });

        // Generate markdown
        let markdown = '';
        
        const title = document.getElementById('title').value;
        if (title) markdown += `# ${title}\n\n`;
        
        const subtitle = document.getElementById('subtitle').value;
        if (subtitle) markdown += `## ${subtitle}\n\n`;
        
        const work = document.getElementById('work').value;
        if (work) markdown += `### Work\n${work}\n\n`;
        
        // Skills sections
        const sections = [
            { id: 'skills', title: 'Skills' },
            { id: 'programming-languages', title: 'Programming Languages' },
            { id: 'frontend', title: 'Frontend Development' },
            { id: 'backend', title: 'Backend Development' },
            { id: 'mobile', title: 'Mobile App Development' },
            { id: 'ai-ml', title: 'AI/ML' },
            { id: 'database', title: 'Database' },
            { id: 'data-visualization', title: 'Data Visualization' },
            { id: 'devops', title: 'Devops' },
            { id: 'baas', title: 'Backend as a Service(BaaS)' },
            { id: 'framework', title: 'Framework' },
            { id: 'testing', title: 'Testing' },
            { id: 'software', title: 'Software' },
            { id: 'static-site', title: 'Static Site Generators' },
            { id: 'game-engines', title: 'Game Engines' },
            { id: 'automation', title: 'Automation' },
            { id: 'other', title: 'Other' }
        ];
        
        sections.forEach(section => {
            const values = document.getElementById(section.id).value
                .split(',').map(item => item.trim()).filter(item => item);
            if (values.length > 0) {
                markdown += `### ${section.title}\n${values.join(', ')}\n\n`;
            }
        });
        
        // Social links
        const socialLinks = [];
        const socialInputs = [
            { id: 'social-github', name: 'github', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' },
            { id: 'social-twitter', name: 'twitter', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg' },
            { id: 'social-dev', name: 'dev.to', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg' },
            { id: 'social-codepen', name: 'codepen', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/codepen.svg' },
            { id: 'social-codesandbox', name: 'codesandbox', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/codesandbox.svg' },
            { id: 'social-stackoverflow', name: 'stackoverflow', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/stackoverflow.svg' },
            { id: 'social-linkedin', name: 'linkedin', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg' },
            { id: 'social-kaggle', name: 'kaggle', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/kaggle.svg' },
            { id: 'social-facebook', name: 'facebook', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg' },
            { id: 'social-instagram', name: 'instagram', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg' },
            { id: 'social-dribbble', name: 'dribbble', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/dribbble.svg' },
            { id: 'social-behance', name: 'behance', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/behance.svg' },
            { id: 'social-hashnode', name: 'hashnode', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/hashnode.svg' },
            { id: 'social-medium', name: 'medium', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/medium.svg' },
            { id: 'social-youtube', name: 'youtube', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/youtube.svg' },
            { id: 'social-codechef', name: 'codechef', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg' },
            { id: 'social-hackerrank', name: 'hackerrank', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/hackerrank.svg' },
            { id: 'social-codeforces', name: 'codeforces', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codeforces.svg' },
            { id: 'social-leetcode', name: 'leetcode', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/leetcode.svg' },
            { id: 'social-topcoder', name: 'topcoder', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/topcoder.svg' },
            { id: 'social-hackerearth', name: 'hackerearth', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/hackerearth.svg' },
            { id: 'social-geeksforgeeks', name: 'geeksforgeeks', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/geeksforgeeks.svg' },
            { id: 'social-discord', name: 'discord', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/discord.svg' },
            { id: 'social-rssfeed', name: 'rssfeed', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/rss.svg' }
        ];
        
        socialInputs.forEach(social => {
            const url = document.getElementById(social.id).value;
            if (url) {
                socialLinks.push(`[<img src="${social.icon}" width="22" />](${url})`);
            }
        });
        
        if (socialLinks.length > 0) {
            markdown += `### Connect with me:\n${socialLinks.join('\n')}\n\n`;
        }
        
        // Addons
        if (document.getElementById('addon-buymeacoffee').checked) {
            markdown += `[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com)\n\n`;
        }
        
        if (document.getElementById('addon-kofi').checked) {
            markdown += `[![Ko-Fi](https://cdn.ko-fi.com/cdn/kofi3.png?v=3)](https://ko-fi.com)\n\n`;
        }
        
        document.getElementById('preview-content').textContent = markdown;
    }

    async copyMarkdown() {
        const markdown = document.getElementById('preview-content').textContent;
        try {
            await navigator.clipboard.writeText(markdown);
            const btn = document.getElementById('copy-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.classList.add('bg-green-600', 'hover:bg-green-700');
            btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                btn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    resetForm() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
        
        // Clear tags
        const tagContainers = document.querySelectorAll('[id$="-tags"]');
        tagContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        this.generatePreview();
    }

    exportData() {
        const data = {};
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.id] = input.checked;
            } else {
                data[input.id] = input.value;
            }
        });
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'github-profile-data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                Object.keys(data).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = data[key];
                        } else {
                            element.value = data[key];
                        }
                    }
                });
                
                this.generatePreview();
            } catch (error) {
                alert('Error parsing JSON file');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubProfileGenerator();
});
