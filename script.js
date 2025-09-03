// script.js
// GitHub Profile README Generator with all original features
class GitHubProfileGenerator {
    constructor() {
        this.selectedSkills = {
            'skills': [],
            'programming-languages': [],
            'frontend': [],
            'backend': [],
            'mobile': [],
            'ai-ml': [],
            'database': [],
            'data-visualization': [],
            'devops': [],
            'baas': [],
            'framework': [],
            'testing': [],
            'software': [],
            'static-site': [],
            'game-engines': [],
            'automation': [],
            'other': []
        };
        this.init();
    }

    init() {
        // Animate GitHub icon
        if (typeof gsap !== 'undefined') {
            gsap.to('#github-icon', {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });
        }

        // Animate skill sections with staggered delay
        gsap.utils.toArray('.skill-section').forEach((element, i) => {
            gsap.from(element, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: i * 0.1,
                ease: "power2.out",
                onComplete: () => {
                    // Ensure elements remain visible after animation
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
             });
        });

        // Setup event listeners
        this.setupEventListeners();
        this.generatePreview();
    }

    setupEventListeners() {
        // Input handling for regular text inputs
        const textInputs = document.querySelectorAll('input[type="text"]:not([id$="-select"]):not([id$="-tags"]), textarea, select:not([id$="-select"])');
        textInputs.forEach(input => {
            input.addEventListener('input', () => this.generatePreview());
        });

        // Checkbox handling
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.generatePreview());
        });

        // Selectable options for all skills with multiple selection
        const skillTypes = [
            'skills', 'programming-languages', 'frontend', 'backend', 'mobile',
            'ai-ml', 'database', 'data-visualization', 'devops', 'baas',
            'framework', 'testing', 'software', 'static-site', 'game-engines',
            'automation', 'other'
        ];

        skillTypes.forEach(skillType => {
            const addButton = document.getElementById(`add-${skillType}`);
            const clearButton = document.getElementById(`clear-${skillType}`);
            
            if (addButton) {
                addButton.addEventListener('click', () => {
                    const select = document.getElementById(`${skillType}-select`);
                    const selectedOptions = Array.from(select.selectedOptions);
                    const selectedValues = selectedOptions.map(option => option.value);
                    
                    selectedValues.forEach(value => {
                        if (value && !this.selectedSkills[skillType].includes(value)) {
                            this.selectedSkills[skillType].push(value);
                        }
                    });
                    
                    this.updateSelectedSkills(skillType);
                });
            }
            
            if (clearButton) {
                clearButton.addEventListener('click', () => {
                    this.selectedSkills[skillType] = [];
                    this.updateSelectedSkills(skillType);
                });
            }
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

    updateSelectedSkills(skillType) {
        document.getElementById(skillType).value = this.selectedSkills[skillType].join(', ');
        this.updateTagsForField(skillType, this.selectedSkills[skillType]);
        this.generatePreview();
    }

    updateTagsForField(fieldId, values) {
        const tagsContainer = document.getElementById(`${fieldId}-tags`);
        if (!tagsContainer) return;
        
        tagsContainer.innerHTML = '';
        
        values.forEach(value => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = value;
            tag.addEventListener('click', () => {
                // Remove tag on click
                this.selectedSkills[fieldId] = this.selectedSkills[fieldId].filter(item => item !== value);
                this.updateSelectedSkills(fieldId);
            });
            tagsContainer.appendChild(tag);
        });
        
        // Ensure tags are visible
        tagsContainer.style.opacity = '1';
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
        
        // Ensure tags are visible
        tagsContainer.style.opacity = '1';
    }

    generateMarkdown() {
        // Generate markdown
        let markdown = '';
        
        const title = document.getElementById('title').value;
        const name = document.getElementById('name').value;
        if (title || name) {
            markdown += `# ${title} ${name}\n\n`;
        }
        
        const subtitle = document.getElementById('subtitle').value;
        if (subtitle) markdown += `## ${subtitle}\n\n`;
        
        const work = document.getElementById('work').value;
        if (work) markdown += `${work}\n\n`;
        
        // Skills sections
        const sections = [
            { id: 'skills', title: 'Skills', values: this.selectedSkills['skills'] },
            { id: 'programming-languages', title: 'Programming Languages', values: this.selectedSkills['programming-languages'] },
            { id: 'frontend', title: 'Frontend Development', values: this.selectedSkills['frontend'] },
            { id: 'backend', title: 'Backend Development', values: this.selectedSkills['backend'] },
            { id: 'mobile', title: 'Mobile App Development', values: this.selectedSkills['mobile'] },
            { id: 'ai-ml', title: 'AI/ML', values: this.selectedSkills['ai-ml'] },
            { id: 'database', title: 'Database', values: this.selectedSkills['database'] },
            { id: 'data-visualization', title: 'Data Visualization', values: this.selectedSkills['data-visualization'] },
            { id: 'devops', title: 'Devops', values: this.selectedSkills['devops'] },
            { id: 'baas', title: 'Backend as a Service(BaaS)', values: this.selectedSkills['baas'] },
            { id: 'framework', title: 'Framework', values: this.selectedSkills['framework'] },
            { id: 'testing', title: 'Testing', values: this.selectedSkills['testing'] },
            { id: 'software', title: 'Software', values: this.selectedSkills['software'] },
            { id: 'static-site', title: 'Static Site Generators', values: this.selectedSkills['static-site'] },
            { id: 'game-engines', title: 'Game Engines', values: this.selectedSkills['game-engines'] },
            { id: 'automation', title: 'Automation', values: this.selectedSkills['automation'] },
            { id: 'other', title: 'Other', values: this.selectedSkills['other'] }
        ];
        
        sections.forEach(section => {
            if (section.values.length > 0) {
                markdown += `### ${section.title}\n${section.values.join(', ')}\n\n`;
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
        
        // Add-ons
        if (document.getElementById('addon-buymeacoffee') && document.getElementById('addon-buymeacoffee').checked) {
            markdown += `[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com)\n\n`;
        }
        
        if (document.getElementById('addon-kofi') && document.getElementById('addon-kofi').checked) {
            markdown += `[![Ko-Fi](https://cdn.ko-fi.com/cdn/kofi3.png?v=3)](https://ko-fi.com)\n\n`;
        }
        
        if (document.getElementById('addon-visitors-count') && document.getElementById('addon-visitors-count').checked) {
            markdown += `![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fyourusername&label=VISITORS&labelColor=%23000000&countColor=%23007ec6)\n\n`;
        }
        
        if (document.getElementById('addon-github-trophy') && document.getElementById('addon-github-trophy').checked) {
            markdown += `[![trophy](https://github-profile-trophy.vercel.app/?username=yourusername)](https://github.com/ryo-ma/github-profile-trophy)\n\n`;
        }
        
        if (document.getElementById('addon-github-stats') && document.getElementById('addon-github-stats').checked) {
            markdown += `[![GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)](https://github.com/anuraghazra/github-readme-stats)\n\n`;
        }
        
        if (document.getElementById('addon-top-skills') && document.getElementById('addon-top-skills').checked) {
            markdown += `[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact)](https://github.com/anuraghazra/github-readme-stats)\n\n`;
        }
        
        if (document.getElementById('addon-github-streak') && document.getElementById('addon-github-streak').checked) {
            markdown += `[![GitHub Streak](https://streak-stats.demolab.com/?user=yourusername)](https://git.io/streak-stats)\n\n`;
        }
        
        if (document.getElementById('addon-twitter-badge') && document.getElementById('addon-twitter-badge').checked) {
            markdown += `[![Twitter Follow](https://img.shields.io/twitter/follow/yourusername?style=social)](https://twitter.com/yourusername)\n\n`;
        }
        
        if (document.getElementById('addon-devto-blogs') && document.getElementById('addon-devto-blogs').checked) {
            markdown += `<!-- BLOG-POST-LIST:START -->\n<!-- BLOG-POST-LIST:END -->\n\n`;
        }
        
        if (document.getElementById('addon-medium-blogs') && document.getElementById('addon-medium-blogs').checked) {
            markdown += `<!-- MEDIUM-BLOG-LIST:START -->\n<!-- MEDIUM-BLOG-LIST:END -->\n\n`;
        }
        
        if (document.getElementById('addon-personal-blogs') && document.getElementById('addon-personal-blogs').checked) {
            markdown += `<!-- PERSONAL-BLOG-LIST:START -->\n<!-- PERSONAL-BLOG-LIST:END -->\n\n`;
        }
        
        document.getElementById('preview-content').textContent = markdown;
        return markdown;
    }

    async copyMarkdown() {
        const markdown = this.generateMarkdown();
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Secure context - use Clipboard API
                await navigator.clipboard.writeText(markdown);
            } else {
                // Fallback for older browsers or insecure contexts
                const textArea = document.createElement("textarea");
                textArea.value = markdown;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            const btn = document.getElementById('copy-btn');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('bg-green-600', 'hover:bg-green-700');
                btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    btn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Show error message
            const btn = document.getElementById('copy-btn');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Error!';
                btn.classList.add('bg-red-600', 'hover:bg-red-700');
                btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('bg-red-600', 'hover:bg-red-700');
                    btn.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'hover:from-blue-700', 'hover:to-purple-700');
                }, 2000);
            }
        }
    }

    resetForm() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (!input.id.endsWith('-select')) {
                input.value = '';
            }
        });
        
        // Reset all selected skills
        Object.keys(this.selectedSkills).forEach(skillType => {
            this.selectedSkills[skillType] = [];
            this.updateSelectedSkills(skillType);
        });
        
        // Clear tags
        const tagContainers = document.querySelectorAll('[id$="-tags"]');
        tagContainers.forEach(container => {
            container.innerHTML = '';
            container.style.opacity = '1';
        });
        
        this.generatePreview();
    }

    exportData() {
        const data = {
            selectedSkills: this.selectedSkills
        };
        
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.id] = input.checked;
            } else if (!input.id.endsWith('-select')) {
                data[input.id] = input.value;
            }
        });
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
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
                
                // Restore selected skills
                if (data.selectedSkills) {
                    this.selectedSkills = data.selectedSkills;
                    Object.keys(this.selectedSkills).forEach(skillType => {
                        this.updateSelectedSkills(skillType);
                    });
                }
                
                // Restore other inputs
                Object.keys(data).forEach(key => {
                    if (key !== 'selectedSkills') {
                        const element = document.getElementById(key);
                        if (element) {
                            if (element.type === 'checkbox') {
                                element.checked = data[key];
                            } else if (!element.id.endsWith('-select')) {
                                element.value = data[key];
                            }
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
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, animations disabled');
    }
    
    new GitHubProfileGenerator();
});
