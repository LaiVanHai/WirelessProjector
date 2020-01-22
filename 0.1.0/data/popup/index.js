'use strict';

const container = document.querySelector('.grid');
const item = document.querySelector('.grid-item');
const no_all_app = document.getElementById('no-all-app');
const no_4k_app = document.getElementById('no-4k-app');
const no_pro_app = document.getElementById('no-pro-app');
const section = document.getElementById('section');
const ez_cast_4k = "EZCast";
const ez_cast_pro = "EZCastPro";

document.addEventListener('click', e => {
  const parent = e.target.closest('.grid-item');
  const cmd = e.target.dataset.cmd || parent.dataset.cmd;
  if (cmd === 'open-home') {
    chrome.tabs.create({
      url: parent.dataset.homeurl
    });
  }
  if (cmd === 'open-app') {
    chrome.management.launchApp(parent.dataset.id);
  }
}, false);

chrome.management.getAll(extensions => {
  extensions = extensions.filter(e => e.type.endsWith('app') && e.enabled);
  if (extensions.length) {
    chrome.storage.local.get('ids', obj => {
      const ids = obj.ids || [];
      let ext_list= extensions.sort((e1, e2) => {
        const i = ids.indexOf(e1.id);
        const j = ids.indexOf(e2.id);
        return i !== -1 && j !== -1 ? i - j : 0;
      });

      let ext_name_list = [];
      ext_list.map(app => {
        ext_name_list.push(app.name);
      });

      console.log(ext_name_list);

      let check_ezcast4k_app = ext_name_list.includes(ez_cast_4k);
      let check_ezcastpro_app = ext_name_list.includes(ez_cast_pro);


      if (!check_ezcast4k_app ) {
        no_4k_app.style.display = 'block';
      }
      if (!check_ezcastpro_app ) {
        no_pro_app.style.display = 'block';
      }
      if (check_ezcastpro_app && check_ezcast4k_app) {
        no_all_app.style.display = 'none';
        ext_list.forEach(app => {
          const div = item.cloneNode(true);
          const icon = app.icons.sort((a, b) => b.size - a.size)[0] || {
            url: './addon.svg'
          };

          if(app.name == ez_cast_4k || app.name == ez_cast_pro) {
            // div.style.backgroundImage = `url("${icon.url}")`;
            if(app.name == ez_cast_4k) {
              div.style.backgroundImage = `url("/data/icons/monitor2.png")`;
              div.querySelector('.title').textContent = div.title = "Monitor/TV"
              div.style.backgroundColor = '#57cbffb8';
            } else {
              div.style.backgroundImage = `url("/data/icons/projector.png")`;
              div.querySelector('.title').textContent = div.title = "Projector"
              div.style.backgroundColor = '#ff57cd91';
            }
            div.dataset.id = app.id;
            if (app.homepageUrl) {
              div.dataset.homeurl = app.homepageUrl;
            }
            container.insertBefore(div, no_all_app);
          }
        });
      }

      // // resize
      // const cols = 4;
      // let width = 138 || container.querySelector('.grid-item').getBoundingClientRect().width;
      // width = Math.min(extensions.length, cols) * (width + 10);
      // document.body.style.width = width + 'px';
      // iso
      window.dragableIsotope('.grid', '.grid-item').on('arrangeComplete', function() {
        const ids = this.getFilteredItemElements().map(e => e.dataset.id);
        chrome.storage.local.set({ids});
      });
    });
  }
});
