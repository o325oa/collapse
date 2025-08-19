export class Collapse {
  constructor({ title = 'Toggle', content = '', initiallyOpen = false } = {}) {
    this.title = title;
    this.content = content;
    this.isOpen = Boolean(initiallyOpen);

    this.element = this.#createRoot();
    this.#attach();
    if (this.isOpen) {
      this.#openImmediate();
    }
  }

  #createRoot() {
    const root = document.createElement('section');
    root.className = 'collapse';

    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'collapse__header';
    header.setAttribute('aria-expanded', String(this.isOpen));

    const titleEl = document.createElement('span');
    titleEl.className = 'collapse__title';
    titleEl.textContent = this.title;

    header.appendChild(titleEl);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'collapse__content-wrapper';
    const contentEl = document.createElement('div');
    contentEl.className = 'collapse__content';
    contentEl.innerHTML = this.content;
    contentWrapper.appendChild(contentEl);

    root.appendChild(header);
    root.appendChild(contentWrapper);

    this.refs = { root, header, contentWrapper, contentEl };
    return root;
  }

  #attach() {
    this.refs.header.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    const { root, header, contentWrapper } = this.refs;
    root.classList.add('collapse--open');
    header.setAttribute('aria-expanded', 'true');
    this.#animateToAutoHeight(contentWrapper);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    const { root, header, contentWrapper } = this.refs;
    root.classList.remove('collapse--open');
    header.setAttribute('aria-expanded', 'false');
    this.#animateToZeroHeight(contentWrapper);
  }

  #openImmediate() {
    const { root, header, contentWrapper } = this.refs;
    root.classList.add('collapse--open');
    header.setAttribute('aria-expanded', 'true');
    contentWrapper.style.height = 'auto';
  }

  #animateToAutoHeight(wrapper) {
    wrapper.style.height = 'auto';
    const target = wrapper.scrollHeight;
    wrapper.style.height = '0px';
    wrapper.offsetHeight;
    wrapper.style.height = `${target}px`;
    const onEnd = (e) => {
      if (e.propertyName !== 'height') return;
      wrapper.style.height = 'auto';
      wrapper.removeEventListener('transitionend', onEnd);
    };
    wrapper.addEventListener('transitionend', onEnd);
  }

  #animateToZeroHeight(wrapper) {
    const current = wrapper.scrollHeight;
    wrapper.style.height = `${current}px`;
    wrapper.offsetHeight;
    wrapper.style.height = '0px';
  }
}

