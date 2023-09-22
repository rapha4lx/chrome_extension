
function makeHttpRequest(url, callback) {
    const xhr = new XMLHttpRequest();
  
    // Configurar a solicitação
    xhr.open('GET', url, true);
  
    // Configurar um ouvinte de evento para quando a solicitação estiver concluída
    xhr.onload = function () {
      if (xhr.status === 200) {
        // A solicitação foi bem-sucedida, chame a função de retorno com os dados
        callback(xhr.responseText);
      } else {
        // A solicitação falhou, lide com o erro aqui
        console.error('Erro na solicitação:', xhr.status, xhr.statusText);
      }
    };
  
    // Lidar com erros de rede
    xhr.onerror = function () {
      console.error('Erro de rede ao fazer a solicitação');
    };
  
    // Enviar a solicitação
    xhr.send();
}

const injectCSS = css => {
    let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = css;
    document.head.appendChild(el);
    return el;
};

injectCSS('.selectable {height: 100px }');


function checkVac(){
    const profiles = document.querySelectorAll('.selectable');

    profiles.forEach((profile) => {        
        const TempElement = document.createElement('div');
        TempElement.innerHTML = profile.innerHTML;

        const selectable_overlay = TempElement.querySelector('.selectable_overlay');

        // console.log(selectable_overlay.href);
        
        makeHttpRequest(selectable_overlay.href, function(responseText){
            const parser = new DOMParser();
            const doc = parser.parseFromString(responseText, 'text/html');
                
            const vac = doc.querySelector('.profile_ban');

            if(!vac){
                return;
            }

            // const vacDays = doc.querySelector('.profile_ban_status');

            // console.log(name + vacDays.textContent);

            const spanElement = document.createElement('span');
            spanElement.classList.add('friend_last_online_text');
            spanElement.style.color = 'red';

            spanElement.textContent = vac.textContent;

            profile.appendChild(spanElement);

        });
        new Promise(resolve => setTimeout(resolve, 1000));
        

        
    })

}

checkVac();