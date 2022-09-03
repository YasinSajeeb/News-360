const categoriesUrl = 'https://openapi.programming-hero.com/api/news/categories';

const loadCategories = () => {
    fetch(categoriesUrl)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories =>{
    // console.log(categories);
    const ul = document.getElementById('news-categories')
    categories.forEach(category =>{
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('nav-item', 'mx-3');
        li.innerHTML = `
        <a class="nav-link" aria-current="page" href="#" onclick="loadNews('${category.category_id}')">${category.category_name}</a>
        `;
        ul.appendChild(li);
    })
}
    
const loadNews = id =>{
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    
    fetch(newsUrl)
    .then(res => res.json())
    .then(data => displayNews(data.data));
}

const displayNews = category =>{
    // console.log(category);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    category.forEach(categoryElement =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
              <div class="card h-100">
                <img src="${categoryElement.thumbnail_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title my-3 text-primary">${categoryElement.title}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
            </div>
    `;
    newsContainer.appendChild(newsDiv);
    })
    

}

loadCategories();
