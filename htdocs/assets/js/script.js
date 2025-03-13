var rellax = new Rellax('.js-rellax');

class HeaderNav {
    constructor(target) {
        this.target = target;
        this.triggers = document.querySelectorAll(`${this.target}-trigger`);
        this.menus = document.querySelectorAll(`${this.target}-menu`);
        this.parentTrigger = document.querySelector(`${this.target}-parent-trigger`);
        this.parentMenu = document.querySelector(`${this.target}-parent-menu`);
        this.modifier = {
            open: 'is-open',
        };
    }

    init() {
        if (!this.target) return;

        // init
        this.menus.forEach(menu => {
            menu.style.height = '0';
        });

        // parentMenuClick
        this.parentTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (!this.parentTrigger.classList.contains(this.modifier.open)) {
                this.parentOpen();
            } else {
                this.parentClose();
            }
        });

        // menuMouseenter,menuMouseleave
        this.triggers.forEach(trigger => {
            const menu = trigger.nextElementSibling;
            const parentArea = trigger.closest('.p-nav-item');

            parentArea.addEventListener('mouseenter', (e) => {
                e.preventDefault();
                this.open(trigger, menu);
            });

            parentArea.addEventListener('mouseleave', (e) => {
                e.preventDefault();
                this.close(trigger, menu);
            });
        });
    }

    async open(el, target) {
        el.classList.add(this.modifier.open);
        const menuHeight = target.scrollHeight;
        target.style.height = `${menuHeight}px`;
        await this.parentHeight();
    }

    async close(el, target) {
        el.classList.remove(this.modifier.open);
        target.style.height = '0';
        await this.parentHeight();
    }

    parentOpen() {
        this.parentTrigger.classList.add(this.modifier.open);
        const menuHeight = this.parentMenu.scrollHeight;
        this.parentMenu.style.height = `${menuHeight}px`;
    }

    parentClose() {
        this.parentTrigger.classList.remove(this.modifier.open);
        this.parentMenu.style.height = '0';
    }

    parentHeight() {
        this.parentMenu.style.height = 'auto';
        setTimeout(() => {
            const parentMenuHeight = this.parentMenu.scrollHeight;
            this.parentMenu.style.height = `${parentMenuHeight}px`;
        }, 200);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const headerNav = new HeaderNav('.js-nav');
    headerNav.init();
});