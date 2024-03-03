const addToBookmark = (title, view) => {
    // console.log(title, view);
    const bookmarkContainer = document.getElementById("bookmark-cards");
    const newBookmark = document.createElement("div");
    newBookmark.classList = `p-4 lg:p-6 text-base font-bold bg-[#fff] flex justify-between items-center shadow-lg rounded-xl`;
    newBookmark.innerHTML = `
    <h2 class="w-[212px]">${title}</h2>
    <div class="flex gap-x-2">
        <img src="icons/eye.svg" alt="">
        <p>${view}</p>
    </div>
    `;
    bookmarkContainer.appendChild(newBookmark);
};

