// Phishing Restaurant Simulator - Game Logic

class PhishingRestaurantGame {
    constructor() {
        this.gameState = {
            score: 0,
            customersServed: 0,
            correctDecisions: 0,
            totalDecisions: 0,
            lives: 3,
            chefLevel: 'Trainee',
            bestScore: 0,
            totalCustomersAllTime: 0,
            currentCustomer: null,
            currentDish: null,
            isPlaying: false,
            isPaused: false,
            difficulty: 'medium',
            gameSpeed: 'normal',
            patienceTimer: null,
            patienceTimeLeft: 0,
            maxPatienceTime: 6000
        };

        this.loadGameState();
        this.initializeGame();
    }

    initializeGame() {
        this.updateMainMenuStats();
        this.generateCustomers();
        this.generateDishes();
        this.generateTips();
        this.setDifficulty();
        this.setGameSpeed();
    }

    // Save and Load System
    saveGameState() {
        const saveData = {
            bestScore: this.gameState.bestScore,
            totalCustomersAllTime: this.gameState.totalCustomersAllTime,
            chefLevel: this.gameState.chefLevel,
            difficulty: this.gameState.difficulty,
            gameSpeed: this.gameState.gameSpeed
        };
        localStorage.setItem('phishingRestaurantGame', JSON.stringify(saveData));
    }

    loadGameState() {
        const saved = localStorage.getItem('phishingRestaurantGame');
        if (saved) {
            const saveData = JSON.parse(saved);
            this.gameState = { ...this.gameState, ...saveData };
        }
    }

    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Customer Generation
    generateCustomers() {
        this.customers = [
            { name: 'Sarah from HR', role: 'Human Resources', patience: 1.0 },
            { name: 'Mike from IT', role: 'Information Technology', patience: 0.8 },
            { name: 'Jennifer from Sales', role: 'Sales Department', patience: 1.2 },
            { name: 'David from Finance', role: 'Finance Team', patience: 0.9 },
            { name: 'Lisa the Manager', role: 'Department Manager', patience: 0.7 },
            { name: 'Tom the Intern', role: 'Summer Intern', patience: 1.3 },
            { name: 'Amanda from Legal', role: 'Legal Department', patience: 0.8 },
            { name: 'Carlos from Marketing', role: 'Marketing Team', patience: 1.1 },
            { name: 'Rachel the Executive', role: 'C-Suite Executive', patience: 0.6 },
            { name: 'Kevin the Contractor', role: 'External Contractor', patience: 1.0 }
        ];
    }

    // Dish/Email Generation
    generateDishes() {
        this.dishes = [
            // Safe Emails
            {
                name: 'Company Newsletter',
                type: 'safe',
                from: 'newsletter@company.com',
                subject: 'Monthly Company Updates - March 2024',
                body: `Hi Team,

Here are this month's updates:

• New product launches scheduled for Q2
• Employee appreciation day on March 15th
• Updated parking policies effective April 1st

Have a great month!

Best regards,
Company Communications Team`,
                isPhishing: false,
                tips: ['Legitimate company domain', 'Professional tone', 'No urgent demands']
            },
            {
                name: 'Meeting Invitation',
                type: 'safe',
                from: 'calendar@company.com',
                subject: 'Invitation: Weekly Team Meeting',
                body: `You're invited to:

Weekly Team Meeting
Date: Friday, March 8, 2024
Time: 2:00 PM - 3:00 PM
Location: Conference Room B

Agenda:
- Project status updates
- Next week's priorities
- Q&A session

Please confirm your attendance.

Best,
Meeting Organizer`,
                isPhishing: false,
                tips: ['Internal calendar system', 'Specific meeting details', 'Normal business tone']
            },
            {
                name: 'IT System Update',
                type: 'safe',
                from: 'it-support@company.com',
                subject: 'Scheduled Maintenance - Sunday Night',
                body: `Dear Team,

We will be performing scheduled system maintenance this Sunday from 11:00 PM to 1:00 AM.

During this time, you may experience:
- Brief network interruptions
- Slower email delivery
- Limited access to shared drives

No action is required from you. Systems will be back to normal by Monday morning.

For questions, contact IT at extension 5555.

IT Support Team
Company Name`,
                isPhishing: false,
                tips: ['Official IT domain', 'Specific maintenance window', 'No urgent action required']
            },

            // Phishing Emails - Easy
            {
                name: 'Urgent Account Suspension',
                type: 'phishing',
                from: 'security-alert@bankng.com',
                subject: 'URGENT: Your Account Will Be Closed in 24 Hours!',
                body: `IMMEDIATE ACTION REQUIRED!

Your account has been flagged for suspicious activity and will be PERMANENTLY CLOSED within 24 hours unless you verify your identity now.

CLICK HERE TO SAVE YOUR ACCOUNT: http://verify-bankng.sketchy-site.com

If you ignore this message, you will lose access to all your funds forever!

This is your FINAL WARNING!

Bank Security (Definitely Real)`,
                isPhishing: true,
                tips: ['Threatening urgent language', 'Suspicious domain', 'Pressure tactics', 'Poor grammar']
            },
            {
                name: 'Lottery Winner Notification',
                type: 'phishing',
                from: 'winner-notifications@international-lottery.org',
                subject: 'Congratulations! You Won $2,500,000!!!',
                body: `🎉 CONGRATULATIONS!!! 🎉

You have WON the International Email Lottery!

Prize Amount: $2,500,000.00 USD
Winning Numbers: 7-14-23-31-42
Reference: IEL-2024-WIN-789

To claim your prize immediately, send us:
- Full name and address  
- Phone number
- Bank account details
- Copy of your ID

Reply within 48 hours or forfeit your winnings!

Mr. John Winner (Totally Legitimate)
International Lottery Commission`,
                isPhishing: true,
                tips: ['Too good to be true', 'Requests personal info', 'Artificial urgency', 'Unprofessional tone']
            },

            // Phishing Emails - Medium
            {
                name: 'Security Update Required',
                type: 'phishing',
                from: 'security@company-updates.net',
                subject: 'Mandatory Security Update - Complete by EOD',
                body: `Security Notice: All Employees

A critical security vulnerability has been detected. All employees must update their systems immediately.

Download the security patch:
https://company-updates.net/critical-patch.exe

Instructions:
1. Download and run the security tool
2. Enter your login credentials when prompted
3. Restart your computer

Failure to complete this update by end of business today may result in system lockout.

IT Security Department
(This is definitely from your real IT team)`,
                isPhishing: true,
                tips: ['Domain spoofing', 'Requests credentials', 'Executable download', 'Artificial deadline']
            },
            {
                name: 'PayPal Account Problem',
                type: 'phishing',
                from: 'service@paypal-security.com',
                subject: 'Action Required: Unusual Activity Detected',
                body: `Dear PayPal Customer,

We have detected unusual activity on your PayPal account and have temporarily limited access for your protection.

Recent activity:
- Login from unknown location (Nigeria)
- Attempted transfer of $4,500
- Password change request

To restore full access to your account, please verify your information:

Verify Account: https://paypal-security.com/verify-account

This link expires in 6 hours for security reasons.

PayPal Customer Service
(We're definitely the real PayPal)`,
                isPhishing: true,
                tips: ['Impersonation attempt', 'Fear tactics', 'Fake security concerns', 'Suspicious domain']
            },

            // Phishing Emails - Hard
            {
                name: 'Microsoft Office Expiring',
                type: 'phishing',
                from: 'office-renewals@microsoft-services.com',
                subject: 'Your Microsoft Office License Expires Tomorrow',
                body: `Microsoft Office License Notification

Dear Valued Customer,

Your Microsoft Office 365 Business license will expire tomorrow (March 9, 2024).

License Details:
- Product: Office 365 Business Premium
- Licensed to: ${this.getRandomEmail()}
- Expiration: March 9, 2024
- License Key: MSO-2024-BUS-847291

To avoid service interruption, please renew immediately:

Renew License: https://microsoft-services.com/office-renewal
Alternative: https://renew-office.microsoft-services.com

Questions? Contact support at: +1-800-OFFICE (This is totally Microsoft)

Microsoft Licensing Team
One Microsoft Way, Redmond, WA`,
                isPhishing: true,
                tips: ['Professional appearance', 'Urgency with deadline', 'Subtle domain differences', 'Impersonation']
            },
            {
                name: 'IRS Tax Refund',
                type: 'phishing',
                from: 'refunds@irs-treasury.gov.processing.com',
                subject: 'IRS: Your Tax Refund of $3,247 is Ready for Processing',
                body: `Internal Revenue Service
U.S. Department of Treasury

Taxpayer ID: ${Math.floor(Math.random() * 1000000)}
Tax Year: 2023

Dear Taxpayer,

Our records indicate you are eligible for a tax refund of $3,247.00.

To expedite processing of your refund, please verify your information through our secure portal:

Process Refund: https://irs-treasury.gov.processing.com/refund-portal

Required information:
- Social Security Number
- Bank routing and account numbers  
- Previous year tax return (for verification)

Processing must be completed within 72 hours to receive refund this tax season.

IRS Refund Processing Division
Internal Revenue Service`,
                isPhishing: true,
                tips: ['Government impersonation', 'Money as bait', 'Complex fake domain', 'Pressure deadline']
            }
        ];
    }

    getRandomEmail() {
        const domains = ['company.com', 'business.org', 'office.net'];
        const names = ['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson'];
        return `${names[Math.floor(Math.random() * names.length)]}@${domains[Math.floor(Math.random() * domains.length)]}`;
    }

    // Tips Generation
    generateTips() {
        this.tips = [
            'Look for suspicious sender addresses and domain names!',
            'Be wary of urgent language and artificial deadlines!',
            'Legitimate companies rarely ask for passwords via email!',
            'Check for poor grammar and spelling mistakes!',
            'Too-good-to-be-true offers are usually scams!',
            'Hover over links to see where they really go!',
            'Be suspicious of unexpected attachments!',
            'Official emails usually come from official domains!',
            'Phishers often impersonate trusted organizations!',
            'When in doubt, verify through official channels!'
        ];
    }

    // Difficulty and Speed Settings
    setDifficulty() {
        const difficulty = this.gameState.difficulty;
        switch (difficulty) {
            case 'easy':
                this.phishingRatio = 0.7; // 70% phishing emails
                break;
            case 'medium':
                this.phishingRatio = 0.5; // 50% phishing emails
                break;
            case 'hard':
                this.phishingRatio = 0.3; // 30% phishing emails (harder to spot)
                break;
        }
    }

    setGameSpeed() {
        const speed = this.gameState.gameSpeed;
        switch (speed) {
            case 'slow':
                this.gameState.maxPatienceTime = 8000; // 8 seconds
                break;
            case 'normal':
                this.gameState.maxPatienceTime = 6000; // 6 seconds
                break;
            case 'fast':
                this.gameState.maxPatienceTime = 4000; // 4 seconds
                break;
        }
    }

    // Game Flow
    startGame() {
        this.resetGameStats();
        this.gameState.isPlaying = true;
        this.gameState.isPaused = false;
        this.showScreen('game-screen');
        this.nextCustomer();
    }

    resetGameStats() {
        this.gameState.score = 0;
        this.gameState.customersServed = 0;
        this.gameState.correctDecisions = 0;
        this.gameState.totalDecisions = 0;
        this.gameState.lives = 3;
    }

    nextCustomer() {
        if (!this.gameState.isPlaying || this.gameState.isPaused) return;

        // Select random customer and dish
        this.gameState.currentCustomer = this.customers[Math.floor(Math.random() * this.customers.length)];
        
        // Determine if this should be a phishing email based on difficulty
        const shouldBePhishing = Math.random() < this.phishingRatio;
        const availableDishes = this.dishes.filter(dish => dish.isPhishing === shouldBePhishing);
        this.gameState.currentDish = availableDishes[Math.floor(Math.random() * availableDishes.length)];

        // Display customer and dish
        this.displayCurrentOrder();
        this.startPatienceTimer();
        this.updateGameDisplay();
        this.showRandomTip();
    }

    displayCurrentOrder() {
        const customer = this.gameState.currentCustomer;
        const dish = this.gameState.currentDish;

        // Update customer info
        document.getElementById('customer-name').textContent = customer.name;
        document.getElementById('customer-role').textContent = customer.role;

        // Update dish info
        document.getElementById('dish-name').textContent = dish.name;
        document.getElementById('dish-type').textContent = dish.type.charAt(0).toUpperCase() + dish.type.slice(1);
        document.getElementById('dish-type').className = `dish-type ${dish.type}`;
        document.getElementById('email-from').textContent = dish.from;
        document.getElementById('email-subject').textContent = dish.subject;
        document.getElementById('email-body').textContent = dish.body;
    }

    startPatienceTimer() {
        this.gameState.patienceTimeLeft = this.gameState.maxPatienceTime;
        const patienceFill = document.getElementById('patience-fill');
        
        this.gameState.patienceTimer = setInterval(() => {
            if (this.gameState.isPaused) return;
            
            this.gameState.patienceTimeLeft -= 100;
            const percentage = (this.gameState.patienceTimeLeft / this.gameState.maxPatienceTime) * 100;
            patienceFill.style.width = `${Math.max(0, percentage)}%`;
            
            if (this.gameState.patienceTimeLeft <= 0) {
                this.handleTimeout();
            }
        }, 100);
    }

    stopPatienceTimer() {
        if (this.gameState.patienceTimer) {
            clearInterval(this.gameState.patienceTimer);
            this.gameState.patienceTimer = null;
        }
    }

    handleTimeout() {
        this.stopPatienceTimer();
        this.makeDecision('timeout');
    }

    makeDecision(decision) {
        if (!this.gameState.isPlaying || this.gameState.isPaused) return;

        this.stopPatienceTimer();
        this.gameState.totalDecisions++;

        const dish = this.gameState.currentDish;
        const isCorrect = this.evaluateDecision(decision, dish.isPhishing);
        
        if (decision === 'timeout') {
            this.handleIncorrectDecision('Customer got impatient!');
        } else if (isCorrect) {
            this.handleCorrectDecision();
        } else {
            this.handleIncorrectDecision('Wrong decision!');
        }

        // Brief delay before next customer
        setTimeout(() => {
            if (this.gameState.isPlaying && this.gameState.lives > 0) {
                this.nextCustomer();
            }
        }, 1500);
    }

    evaluateDecision(decision, isPhishing) {
        if (decision === 'timeout') return false;
        if (decision === 'serve' && !isPhishing) return true; // Serve safe email
        if (decision === 'reject' && isPhishing) return true; // Reject phishing email
        return false;
    }

    handleCorrectDecision() {
        this.gameState.correctDecisions++;
        this.gameState.customersServed++;
        
        // Calculate score with speed bonus
        const speedBonus = Math.floor((this.gameState.patienceTimeLeft / this.gameState.maxPatienceTime) * 5);
        const points = 10 + speedBonus;
        this.gameState.score += points;

        // Visual feedback
        this.showFeedback(`Correct! +${points} points`, 'correct');
        this.updateGameDisplay();
    }

    handleIncorrectDecision(message) {
        this.gameState.lives--;
        this.gameState.score = Math.max(0, this.gameState.score - 5);
        
        // Visual feedback
        this.showFeedback(`${message} -5 points`, 'incorrect');
        this.updateGameDisplay();
        
        if (this.gameState.lives <= 0) {
            setTimeout(() => this.endGame(), 1000);
        }
    }

    showFeedback(message, type) {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'correct' ? '#00b894' : '#e74c3c'};
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInOut 1.5s ease-in-out;
        `;
        
        document.body.appendChild(feedback);
        setTimeout(() => document.body.removeChild(feedback), 1500);

        // Flash effect on action buttons
        const buttons = document.querySelectorAll('.action-button');
        buttons.forEach(btn => {
            btn.classList.add(`${type}-flash`);
            setTimeout(() => btn.classList.remove(`${type}-flash`), 500);
        });
    }

    updateGameDisplay() {
        document.getElementById('current-score').textContent = this.gameState.score;
        document.getElementById('customers-served').textContent = this.gameState.customersServed;
        
        const accuracy = this.gameState.totalDecisions > 0 
            ? Math.round((this.gameState.correctDecisions / this.gameState.totalDecisions) * 100)
            : 100;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        // Update lives display
        const livesDisplay = document.getElementById('lives-display');
        livesDisplay.textContent = '❤️'.repeat(this.gameState.lives) + '💔'.repeat(3 - this.gameState.lives);
    }

    showRandomTip() {
        const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
        document.getElementById('current-tip').textContent = tip;
    }

    // Game Control
    pauseGame() {
        if (!this.gameState.isPlaying) return;
        
        this.gameState.isPaused = true;
        this.stopPatienceTimer();
        
        // Update pause screen stats
        document.getElementById('pause-score').textContent = this.gameState.score;
        document.getElementById('pause-customers').textContent = this.gameState.customersServed;
        const accuracy = this.gameState.totalDecisions > 0 
            ? Math.round((this.gameState.correctDecisions / this.gameState.totalDecisions) * 100)
            : 100;
        document.getElementById('pause-accuracy').textContent = `${accuracy}%`;
        
        this.showScreen('pause-screen');
    }

    resumeGame() {
        if (!this.gameState.isPlaying) return;
        
        this.gameState.isPaused = false;
        this.showScreen('game-screen');
        this.startPatienceTimer(); // Resume patience timer
    }

    endGame() {
        this.gameState.isPlaying = false;
        this.gameState.isPaused = false;
        this.stopPatienceTimer();

        // Update statistics
        this.updateFinalStats();
        this.updateChefLevel();
        this.checkAchievements();
        this.saveGameState();

        this.showScreen('game-over');
    }

    updateFinalStats() {
        // Update best score
        if (this.gameState.score > this.gameState.bestScore) {
            this.gameState.bestScore = this.gameState.score;
        }
        
        // Update total customers served
        this.gameState.totalCustomersAllTime += this.gameState.customersServed;

        // Display final stats
        document.getElementById('final-score').textContent = this.gameState.score;
        document.getElementById('final-customers').textContent = this.gameState.customersServed;
        const finalAccuracy = this.gameState.totalDecisions > 0 
            ? Math.round((this.gameState.correctDecisions / this.gameState.totalDecisions) * 100)
            : 100;
        document.getElementById('final-accuracy').textContent = `${finalAccuracy}%`;
        document.getElementById('chef-rating').textContent = this.gameState.chefLevel;
    }

    updateChefLevel() {
        const score = this.gameState.bestScore;
        if (score >= 1000) this.gameState.chefLevel = 'Master Chef 👑';
        else if (score >= 500) this.gameState.chefLevel = 'Head Chef 👨‍🍳';
        else if (score >= 200) this.gameState.chefLevel = 'Sous Chef 🔥';
        else if (score >= 100) this.gameState.chefLevel = 'Line Cook 🍳';
        else this.gameState.chefLevel = 'Trainee 👶';
    }

    checkAchievements() {
        const achievements = [];
        
        if (this.gameState.customersServed >= 10) {
            achievements.push('🏆 Service Star - Served 10+ customers in one shift!');
        }
        
        if (this.gameState.score >= 200) {
            achievements.push('🌟 High Score - Earned 200+ points!');
        }
        
        const accuracy = this.gameState.totalDecisions > 0 
            ? (this.gameState.correctDecisions / this.gameState.totalDecisions) * 100
            : 100;
        
        if (accuracy >= 90 && this.gameState.totalDecisions >= 5) {
            achievements.push('🎯 Accuracy Expert - 90%+ accuracy!');
        }
        
        if (this.gameState.customersServed >= 20) {
            achievements.push('🚀 Speed Demon - Served 20+ customers!');
        }

        // Display achievements
        const achievementsDiv = document.getElementById('achievements');
        achievementsDiv.innerHTML = '';
        achievements.forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement';
            achievementDiv.textContent = achievement;
            achievementsDiv.appendChild(achievementDiv);
        });
    }

    // UI Management
    updateMainMenuStats() {
        document.getElementById('chef-level').textContent = this.gameState.chefLevel;
        document.getElementById('best-score').textContent = this.gameState.bestScore;
        document.getElementById('total-customers').textContent = this.gameState.totalCustomersAllTime;
    }

    showLeaderboard() {
        // For now, show personal best scores
        const leaderboardContent = document.getElementById('leaderboard-content');
        leaderboardContent.innerHTML = `
            <div class="leaderboard-entry top-3">
                <span>🥇 Your Best Score</span>
                <span>${this.gameState.bestScore} points</span>
            </div>
            <div class="leaderboard-entry">
                <span>👨‍🍳 Chef Level</span>
                <span>${this.gameState.chefLevel}</span>
            </div>
            <div class="leaderboard-entry">
                <span>🏆 Total Customers Served</span>
                <span>${this.gameState.totalCustomersAllTime}</span>
            </div>
        `;
        this.showScreen('leaderboard');
    }

    // Settings
    changeDifficulty() {
        const select = document.getElementById('difficulty');
        this.gameState.difficulty = select.value;
        this.setDifficulty();
        this.saveGameState();
    }

    changeGameSpeed() {
        const select = document.getElementById('game-speed');
        this.gameState.gameSpeed = select.value;
        this.setGameSpeed();
        this.saveGameState();
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            localStorage.removeItem('phishingRestaurantGame');
            this.gameState.bestScore = 0;
            this.gameState.totalCustomersAllTime = 0;
            this.gameState.chefLevel = 'Trainee';
            this.updateMainMenuStats();
            alert('All progress has been reset!');
        }
    }
}

// Global Game Instance
let game;

// Global Functions (called by HTML)
function startGame() {
    game.startGame();
}

function showMainMenu() {
    game.showScreen('main-menu');
    game.updateMainMenuStats();
}

function showInstructions() {
    game.showScreen('instructions');
}

function showSettings() {
    // Update settings display to current values
    document.getElementById('difficulty').value = game.gameState.difficulty;
    document.getElementById('game-speed').value = game.gameState.gameSpeed;
    game.showScreen('settings');
}

function showLeaderboard() {
    game.showLeaderboard();
}

function makeDecision(decision) {
    game.makeDecision(decision);
}

function pauseGame() {
    game.pauseGame();
}

function resumeGame() {
    game.resumeGame();
}

function endGame() {
    game.endGame();
}

function changeDifficulty() {
    game.changeDifficulty();
}

function changeGameSpeed() {
    game.changeGameSpeed();
}

function resetProgress() {
    game.resetProgress();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    game = new PhishingRestaurantGame();
    
    // Add CSS animation for feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
});