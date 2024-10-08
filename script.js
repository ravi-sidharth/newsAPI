let url = 'https://newsapi.org/v2/everything?';
let apiKey = 'f640f1ff0a114321b25177eb7a462a99';

window.addEventListener('load', ()=> {
    getNews("india");
})

function reload() {
    window.location.reload();
}

async function getNews(query) {
    try {
        let res = await fetch(`${url}q=${query}&apiKey=${apiKey}`)
        let data = await res.json()
        // bindData(data.articles.slice(0,10))
        bindData(data.articles)

    } catch (err) {
        document.querySelector('body').innerHTML=`404 Page Not Found`
        console.log("ERROR:",err)
    }
    
}

function bindData(articles) {
    const cardsContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('news-card-template');

    cardsContainer.innerHTML="";
    articles.forEach((article) => {
        if (!article.urlToImage) return
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector('img');
    const newsTitle = cardClone.querySelector('h3');
    const newsSource = cardClone.querySelector('h6');
    const newsDesc  = cardClone.querySelector('p');
   
    newsImg.src=article.urlToImage;
    newsTitle.innerText=article.title;
    newsDesc.innerText=article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerText=`${article.source.name} - ${date}`

    cardClone.firstElementChild.addEventListener('click',()=> {
        window.open(article.url,"_blank")
    })
}

currentActiveNav=null;
function onNavItemClick(id) {
    getNews(id);
    const navItem =document.getElementById(id);
    currentActiveNav?.classList.remove('active');
    currentActiveNav=navItem;
    currentActiveNav.classList.add('active');
}

const newsInput = document.getElementById('news-input')
const searchBtn = document.getElementById('search-button')

searchBtn.addEventListener('click',()=> {
    const query = newsInput.value;
    getNews(query);
    currentActiveNav?.classList.remove('active');
})


