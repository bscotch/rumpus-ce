const rce = new window.RumpusCE();

/**
 * @param {any} claim
 * @param {string} message
 * @returns {asserts claim}
 */
function assertClaim(claim, message) {
  if (!claim) {
    throw new Error(message);
  }
}

/**
 * @template {HTMLElement} [El=HTMLElement]
 * @param {string} selector
 */
function getElements(selector) {
  const elements = /** @type {NodeListOf<El>}*/ (
    document.querySelectorAll(selector)
  );
  assertClaim(elements.length, `Elements selected by ${selector} do not exist`);
  return elements;
}

/**
 * @param {string} selector
 * @param {string} innerHtml
 */
function setElementsInnerHtml(selector, innerHtml) {
  const elements = getElements(selector);
  elements.forEach((element) => (element.innerHTML = innerHtml));
  return elements;
}

/**
 * @param {string} imageId
 * @param {string} url
 */
function setImageSrc(imageId, url) {
  const imageEl = /** @type {NodeListOf<HTMLImageElement>} */ (
    getElements(imageId)
  );
  imageEl.forEach((image) => (image.src = url));
  return imageEl;
}

async function populateStaticContent() {
  const versionInfo = await rce.version();
  setElementsInnerHtml('#rumpus-version', versionInfo.rumpus);
  /** @type {[id:string, size:number][]} */
  const logoList = [
    ['#logo-header', 64],
    ['#logo-footer', 32],
  ];
  for (const [id, size] of logoList) {
    setImageSrc(id, rce.createLogoUrl(size));
  }
}

function getUserIdInputElement() {
  return /** @type {HTMLInputElement} */ (getElements('#user-id-input')[0]);
}

/**
 * @param {string} userId
 */
function setUserIdInputElement(userId) {
  getUserIdInputElement().value = userId;
}

/**
 * @param {string} message
 */
function setErrorMessage(message) {
  const errorMessageEl = /** @type {HTMLParagraphElement} */ (
    getElements('#error-message')[0]
  );
  if (message) {
    message = `⚠ ${message}`;
    errorMessageEl.hidden = false;
  } else {
    errorMessageEl.hidden = true;
  }
  errorMessageEl.innerText = message;
}

async function loadReadme() {
  const readme = await (await fetch('./readme.html')).text();
  setElementsInnerHtml('#readme-content', readme);
  // @ts-expect-error
  // eslint-disable-next-line no-undef
  await hljs.highlightAll();
}

/**
 * @param {string} userId
 */
async function showUserProfile(userId) {
  loadReadme();
  const sampleProfile = await rce.levelhead.players.getPlayer(userId);
  setElementsInnerHtml('.alias', (await sampleProfile.alias).name);
  setImageSrc('#avatar', await sampleProfile.createAvatarUrl(128));
  const statNames = /** @type {(keyof typeof sampleProfile['stats'])[]} */ (
    Object.keys(sampleProfile.stats)
  );
  let statsRows = ``;
  for (const statName of statNames) {
    const value = Math.round(sampleProfile.stats[statName]);
    statsRows += `<tr class="stat-row"><th scope="row" class="stat-name">${statName}</th><td  class="stat-value">${value}</td></tr>`;
  }
  setElementsInnerHtml('#stats>tbody', statsRows);
  setUserIdInputElement(userId);
}

// Listen for new userId submissions
const form = /** @type {HTMLFormElement} */ (getElements('#user-id-form')[0]);

/**
 *
 * @param {SubmitEvent} event
 */
form.onsubmit = async (event) => {
  event.preventDefault();
  const userId = getUserIdInputElement().value;
  try {
    await showUserProfile(userId);
  } catch (err) {
    // @ts-ignore
    setErrorMessage(err.message);
  }
};

getUserIdInputElement().onkeyup = () => setErrorMessage('');

// Initial load
populateStaticContent();
showUserProfile('bscotch404');
