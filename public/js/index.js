$(function () {
    console.log("fart")
    document.getElementById("main").addEventListener("click", function () {
        copy()
        alert("Copied!\nDon't be dumb enough to actually use this in a sale post... or do")
    });
    var artisans = [];
    $.ajax({
        url: "https://raw.githubusercontent.com/keycap-archivist/database/master/db/catalog.json"
    })
        .done(function (data) {
            const a = JSON.parse(data)
            for (let item in a) {
                const name = a[item].name
                const ig = a[item].instagram
                const id = a[item].id
                for (let sculpt in a[item].sculpts) {
                    const s_name = a[item].sculpts[sculpt].name
                    const s_id = a[item].sculpts[sculpt].id
                    for (let clw in a[item].sculpts[sculpt].colorways) {
                        const c_name = a[item].sculpts[sculpt].colorways[clw].name
                        const c_image = a[item].sculpts[sculpt].colorways[clw].img
                        const c_id = a[item].sculpts[sculpt].colorways[clw].id
                        artisans.push({ "name": name, "instagram": ig, "sculpt": s_name, "colorway": c_name, "id": `${id}-${s_id}-${c_id}`, "image": c_image, "price": randoPrice()})
                    }
                }
            }
            const totalColorways = artisans.length
            var picks = []
            for  (x = 0; x <= Math.floor(Math.random()*50   ); x++) {
                let pick = rando(artisans)
                // console.log(artisans[0].id, pick.id)
                if (picks.some(el => el.id == pick.id)) {     
                    console.log("No dupes pls") 
                } else {
                    picks.push(pick)
                }
            }
            delete artisans
            let totalCost = 0
            picks.forEach((cap) => {
                totalCost += cap.price
            })
            let output = ""
            output += `<div class=""><span class="big">WTS</span><br> Good morning ${noun()}, I am looking to sell ${picks.length} artisan${(picks.length != 1) ? "s" : ""} for $${totalCost}. This is sadly due to ${reason1()} ${reason2()}.</div>`
            output += "<br>"
            output += "<div class='grid-container border'><div class='grid-x grid-margin-x small-up-4 medium-up-4 large-up-5'>"
            picks.forEach((cap) => {
                output += `<div class="cell"><div class="card"><img src="${cap.image}"><div class="card-section">${cap.name}<br><span>${cap.sculpt} - ${cap.colorway}</span><div>$${cap.price}</div></div></div><br></div>`
            })
            output += "</div></div>"
            $('#main').html(`${output}`)
        })
        
})

function copy() {
    var target = document.getElementById('main');
    var range, select;
    if (document.createRange) {
        range = document.createRange();
        range.selectNode(target)
        select = window.getSelection();
        select.removeAllRanges();
        select.addRange(range);
        document.execCommand('copy');
        select.removeAllRanges();
    } else {
        range = document.body.createTextRange();
        range.moveToElementText(target);
        range.select();
        document.execCommand('copy');
    }
}

function rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randoPrice() {
    const mult = Math.floor(Math.random() * 1000)

    return (Math.floor(Math.random() * mult))
}

function noun() {
    const nouns = ["people", "everyone", "plebians", "cashcows"]
    return nouns[Math.floor(Math.random() * nouns.length)]
}
function reason1() {
    const reasons = ["a fly looking at me", "my brother's sister's boyfriend needing dinner", "it raining", "a sneeze", "a leaf falling outside "]
    return reasons[Math.floor(Math.random() * reasons.length)]
}

function reason2() {
    const reasons = [" and I'm hungry", " and I'm out running", " and it's almost the holidays", " and I need to sell my family heirlooms", ""]
    return reasons[Math.floor(Math.random() * reasons.length)]
}