  const stage = document.getElementById('stage');
  const formPanel = document.getElementById('formPanel');
  const scissors = document.getElementById('scissors');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const closeBtn = document.getElementById('closeBtn');
  const switchLink = document.getElementById('switchLink');
  const theForm = document.getElementById('theForm');
  const confirmMsg = document.getElementById('confirmMsg');

  const formEyebrow = document.getElementById('formEyebrow');
  const formTitle = document.getElementById('formTitle');
  const formSub = document.getElementById('formSub');
  const submitBtn = document.getElementById('submitBtn');
  const confirmWrap = document.getElementById('confirmWrap');
  const switchText = document.getElementById('switchText');

  const copy = {
    login: {
      eyebrow: 'Packing slip',
      title: 'Welcome back',
      sub: "Log in to open today's box.",
      submit: 'Log in →',
      switchText: 'New here?',
      switchLink: 'Create an account',
      confirm: false
    },
    signup: {
      eyebrow: 'New order',
      title: 'Start your box',
      sub: 'Create an account to start unboxing.',
      submit: 'Create account →',
      switchText: 'Already have a box?',
      switchLink: 'Log in',
      confirm: true
    }
  };

  let isOpen = false;
  let closeTimer = null;

  function applyCopy(mode){
    const c = copy[mode];
    formEyebrow.textContent = c.eyebrow;
    formTitle.textContent = c.title;
    formSub.textContent = c.sub;
    submitBtn.textContent = c.submit;
    switchText.textContent = c.switchText;
    switchLink.textContent = c.switchLink;
    confirmWrap.classList.toggle('active', c.confirm);
    stage.dataset.mode = mode;
  }

  function openBox(mode){
    confirmMsg.hidden = true;
    theForm.hidden = false;
    if (isOpen){
      applyCopy(mode);
      return;
    }
    clearTimeout(closeTimer);
    applyCopy(mode);
    isOpen = true;
    // restart scissors animation cleanly
    scissors.style.animation = 'none';
    void scissors.offsetWidth;
    scissors.style.animation = '';
    stage.classList.add('open');

    setTimeout(() => {
      formPanel.classList.add('show');
    }, 20);
  }

  function closeBox(){
    formPanel.classList.remove('show');
    isOpen = false;
    closeTimer = setTimeout(() => {
      stage.classList.remove('open');
    }, 350);
  }

  btnLogin.addEventListener('click', () => openBox('login'));
  btnSignup.addEventListener('click', () => openBox('signup'));
  closeBtn.addEventListener('click', closeBox);

  switchLink.addEventListener('click', () => {
    const next = stage.dataset.mode === 'login' ? 'signup' : 'login';
    applyCopy(next);
  });

  theForm.addEventListener('submit', (e) => {
    e.preventDefault();
    theForm.hidden = true;
    confirmMsg.hidden = false;
  });
