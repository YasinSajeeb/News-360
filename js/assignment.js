const url = 'https://openapi.programming-hero.com/api/news/categories';

const loadCategories = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories =>{
    // console.log(categories);
    const ul = document.getElementById('news-categories')
    categories.forEach(category =>{
        console.log(category);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a class="nav-link" aria-current="page" href="#">${category.category_name}</a>
        `;
        ul.appendChild(li);
    })
}
    
loadCategories();