
let search = document.querySelector(".search-bar");
let showData = document.querySelector(".search-result");
let pagination = document.querySelector(".pagination");
let cities = document.querySelector("#cities");
let searchresult = document.querySelector(".tableB");
let paginationDiv = document.querySelector(".pages");
let result = [];
let tabs = {};
async function main(input, city){
    let response = await fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`);
    let data = await response.json();
    for(let i = 0;i<data.length;i++){
        let bankObj = data[i];
        let values = Object.values(bankObj);
        for(let j = 0;j<values.length;j++){
            if(values[j] == input){
                result.push(bankObj);
            }
        }
    }
    
    showResult();
}

function showResult(){
    tabs = {};
    let pageLength = pagination.value;
    let noOfTabs = Math.ceil(result.length/pageLength);
    let count = 1;
    let pageCount = 1;
    let singlePageData = [];
    for(let i = 0;i<result.length;i++){
        if(i % pageLength == 0 && i != 0){
            tabs[`page${pageCount}`] = singlePageData;
            pageCount++;
            singlePageData = [];
        }
        singlePageData.push(result[i]);
        count++;
    }
    if(singlePageData.length > 0){
        tabs[`page${pageCount}`] = singlePageData;
    }
    paginationDiv.innerHTML = "";
    for(let i = 1;i<=noOfTabs;i++){
        let singleTab = document.createElement("span");
        singleTab.classList.add("page");
        singleTab.id = `page${i}`;
        singleTab.innerText = i;
        singleTab.addEventListener("click", showTab.bind(this));
        paginationDiv.append(singleTab);
    }
    let pageOne = document.querySelector("#page1");
    showTab(pageOne);

}

function showTab(e){
    let pageNo;
    if(e.currentTarget == null){
        pageNo = e.id;
        e.classList.add("selected");
    }else{
        pageNo = e.currentTarget.id;
        let currentPageSelected = document.querySelector(".page.selected");
        currentPageSelected.classList.remove("selected");
        e.currentTarget.classList.add("selected");
    }
    let pageData = tabs[pageNo]; // array
    searchresult.innerHTML = "";
    for(let i = 0;i<pageData.length;i++){
        let obj = pageData[i];
        let row = document.createElement("tr")
        let th = document.createElement("th");
        th.innerText = i+1;
        th.setAttribute("scope", "row");
        row.append(th);
        let col1 = document.createElement("td");
        col1.innerText = obj["bank_name"];
        

        let col2 = document.createElement("td");
        col2.innerText = obj["branch"];
        

        let col3 = document.createElement("td");
        col3.innerText = obj["bank_id"];
        

        let col4 = document.createElement("td");
        col4.innerText = obj["address"];
        

        let col5 = document.createElement("td");
        col5.innerText = obj["city"];
        

        let col6 = document.createElement("td");
        col6.innerText = obj["state"];
        

        row.append(col1);
        row.append(col2);
        row.append(col3);
        row.append(col4);
        row.append(col5);
        row.append(col6);
        searchresult.append(row);

    }

}

pagination.addEventListener("change", function(e){
    showResult()
})

search.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        if(search.value == ""){
            alert("Type in search bar");
        }else{
            input = search.value;
            search.value = "";
            result = [];
            main(input, cities.value);
        }
    }
})

cities.addEventListener("change", function(){
    searchresult.innerHTML = "";
    paginationDiv.innerHTML = "";
})
