// link to googlesheet: https://docs.google.com/spreadsheets/d/1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE/edit#gid=0

// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:json&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE";
const gids = ["0", "1574569648", "1605451198"];
// END OF DATA SETUP
console.log("connected...")
// TODO your code here
async function main(argument) {
    let employeeUrl = dataURLBase + id + dataURLEnd + gids[0]; 
    let hireUrl = dataURLBase + id + dataURLEnd + gids[1]; 
    let salaryUrl = dataURLBase + id + dataURLEnd + gids[2]; 
    
    // Employees
    const empResponse = await fetch(employeeUrl); 
    console.log(empResponse); 
    const empText = await empResponse.text(); 
    console.log(empText); 
    const employee = JSON.parse(empText.substring(47).slice(0, -2)); 
    //console.log(object.table.rows[1].c[1]);
    console.log(employee.table)

    // hire dates
    const hireResponse = await fetch(hireUrl);
    console.log(hireResponse); 
    const hireText = await hireResponse.text();
    console.log(hireText);
    const hired = JSON.parse(hireText.substring(47).slice(0, -2)); 
    console.log(hired.table); 

    // salary
    const salaryResponse = await fetch(salaryUrl);
    console.log(salaryResponse); 
    const salaryText = await salaryResponse.text();
    console.log(salaryText);
    const salary = JSON.parse(salaryText.substring(47).slice(0, -2)); 
    console.log(salary.table); 

    //console.log(hired.table.rows[0].c[0]);
    console.log(hired.table.cols[0].label);
    console.log(salary.table.cols[0].label); 

    function tableCreate () {
        let table = document.getElementById("employees"); 
        table.border = "1js"; 

        for(let i = 0; i < employee.table.rows.length; i++) {
            let tr = document.createElement("tr"); 
            table.appendChild(tr);
            for(let j=0; j <= 3; j++) {
                var td = document.createElement("td"); 
                // td.innerHTML = ("Row: "+ i +   "Col: "+j);;
                // console.log(employee.table.rows[1].c[1].v)
                if ( j < 2) {
                    td.innerHTML = (employee.table.rows[i].c[j].v)
                } else if (j < 3 && i == 0) {
                    td.innerHTML = (hired.table.cols[i].label)
                } else if (j < 3 && i > 0 ){
                    // use new Date to use Date constructor with given string
                    let date = new Date(hired.table.rows[i-1].c[j-2].f);
                    // convert Date into string
                    let date2 = date.toDateString();
                    // get month, day, year from given string 
                    let date3 = date2.slice(4,15); 
                    console.log(date3);
                    //let [ weekDay, month, day, year] = date.split
                    td.innerHTML = (date3)
                } else if (j < 4 && i == 0){
                    td.innerHTML = (salary.table.cols[i].label) 
                } else if (j < 4 && i > 0){
                    let salaryValue = salary.table.rows[i-1].c[j-3].v;
                    let salaryUSD = new Intl.NumberFormat('en-US', { style: "currency", maximumFractionDigits: 0, 'currency': "USD"}).format(salaryValue);
                    td.innerHTML = (salaryUSD)
                }
                tr.appendChild(td); 
                // adding some basic style
                td.style.padding= "0.5rem";
                td.style.borderColor= 'gray';
                let firstRow = document.querySelector('tr'); 
                firstRow.style.cssText ='background-color: black; color: white; text-transform: capitalize; font-weight: bolder'; 
                let rows = document.querySelectorAll('tr:nth-child(2n+2)'); 
                rows.forEach(row => row.style.backgroundColor = "lightGray")
                }
    ;       }
        }
    tableCreate(); 
}

main(); 
