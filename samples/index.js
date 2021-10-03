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
 * @param {string} id
 * @returns {El}
 */
function getElementById(id) {
  const element = /** @type {El}*/ (document.getElementById(id));
  assertClaim(element, `Element with id ${id} does not exist`);
  return element;
}

/**
 * @param {string} elementId
 * @param {string} innerHtml
 */
function setElementInnerHtml(elementId, innerHtml) {
  const element = getElementById(elementId);
  element.innerHTML = innerHtml;
  return element;
}

/**
 * @param {string} imageId
 * @param {string} url
 */
function setImageSrc(imageId, url) {
  const imageEl = /** @type {HTMLImageElement} */ (getElementById(imageId));
  imageEl.src = url;
}

/** @type {[id:string, size:number][]} */
const logoList = [
  ['logo-header', 64],
  ['logo-footer', 32],
];

async function populatePage() {
  const rce = new window.RumpusCE();
  const versionInfo = await rce.version();
  const sampleProfile = await rce.levelhead.players.getPlayer('bscotch404');
  setElementInnerHtml('rumpus-version', versionInfo.rumpus);
  setElementInnerHtml('alias', (await sampleProfile.alias).name);
  setImageSrc('avatar', await sampleProfile.createAvatarUrl(128));
  for (const [id, size] of logoList) {
    setImageSrc(id, rce.createLogoUrl(size));
  }

  const statNames = /** @type {(keyof typeof sampleProfile['stats'])[]} */ (
    Object.keys(sampleProfile.stats)
  );
  let statsRows = ``;
  for (const statName of statNames) {
    statsRows += `<tr class="stat-row"><td class="stat-name">${statName}</td><td  class="stat-value">${sampleProfile.stats[statName]}</td></tr>`;
  }
  setElementInnerHtml('stats', statsRows);
}

populatePage();
