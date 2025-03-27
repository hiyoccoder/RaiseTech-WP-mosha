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

        this.mediaQueryList = matchMedia('(min-width:1201px)');
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

        this.mediaQueryList.addEventListener('change', (e) => {
            this.triggers.forEach(trigger => {
                const menu = trigger.nextElementSibling;
                trigger.classList.remove(this.modifier.open);
                menu.style.removeProperty('height');
                trigger.classList.remove(this.modifier.open);
                menu.style.height = '0';
            });
            this.parentTrigger.classList.remove(this.modifier.open);
            this.parentMenu.style.removeProperty('height');
        });
    }

    open(el, target) {
        if (this.mediaQueryList.matches) {
            target.classList.remove("is-no-animation");
        }
        el.classList.add(this.modifier.open);
        const menuHeight = target.scrollHeight;
        target.style.height = `${menuHeight}px`;
        if (!this.mediaQueryList.matches) {
            this.parentHeight();
        }
    }

    close(el, target) {
        if (this.mediaQueryList.matches) {
            target.classList.add("is-no-animation");
        }
        el.classList.remove(this.modifier.open);
        target.style.height = '0';
        if (!this.mediaQueryList.matches) {
            this.parentHeight();
        }
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