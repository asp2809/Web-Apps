let i=0;
let from="", to="", invno="1", date="", duedate="", payment="Cash", subtotal=0;
function onDeleteItem(i) {
    console.log("func called")
    console.log(i)
    // get the data index from button
    // Find the tr using data index
    console.log($("tr[data-index=" + i + "]"));
    $("tr[data-index=" + i + "]").remove();
    subtotal=0;
    changeval();
}

function addItem() {
    // select invoice items
    // get last item in the array 
    // get the data-index of this item
    i=$('.invoice-items tr:last').attr('data-index');
    console.log(i);

    // Create a new tr with data-index + 1
    $('.invoice-items').append(`<tr class="item-row" data-index="` + (Number(i)+1) + `">
    <td class="item-row-actions">
        <div class="confirm-delete-button">
            <button title="Remove Item" class="btn btn-remove" style="border-color: rgb(51, 51, 51); color: rgb(51, 51, 51);" onclick="onDeleteItem(this.dataset.index)" data-index="` + (Number(i)+1) + `"><i class="fas fa-minus"></i></button>
        </div>
    </td>
    <td data-label="Item #1" class="item-row-summary">
        <span class="item-row-name">
            <div class="item-suggest">
                <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false" class="react-autosuggest__container">
                    <input type="text" autocomplete="off" aria-autocomplete="list" aria-controls="react-autowhatever-1" class="react-autosuggest__input invoice-item-code" placeholder="Item Description" value="">
                    <div id="react-autowhatever-1" role="listbox" class="react-autosuggest__suggestions-container"></div>
                </div>
            </div>
        </span>
        
    </td>
    <td data-label="Price" class="item-row-rate">
        <span class="react-numeric-input">
            <input type="number" placeholder="0.00" value="0.00" pattern=".*" class="price"><b><i></i></b><b><i></i></b>
        </span>
    </td>
    <td data-label="Quantity" class="item-row-quantity">
        <span class="react-numeric-input">
            <input type="number" value="0" pattern=".*" class="quantity"><b><i></i></b><b><i></i></b>
        </span>
    </td>
    <td data-label="Amount" class="item-row-amount">
        <span class="amount">
            <span class="currency-symbol">₹</span>
            <span class="currency-amount"></span>
        </span>
    </td>
    </tr>`);

}

function changeval() {
    var prices=document.querySelectorAll(".price");
    var quantities=document.querySelectorAll(".quantity");
    var amounts=document.querySelectorAll(".currency-amount");
    for(var i=0; i<prices.length; i++)
    {
        let total=Number($(prices[i]).val())*Number($(quantities[i]).val());
        console.log(total);
        $(amounts[i]).text(total);
        subtotal+=total;
    }
    $('.currency').text(subtotal);
}

$(document).ready(function() {

    $('.btn-add').click(function () {
        addItem();
    });


    $(document).on('keyup', '.price', function() {
        subtotal=0;
        changeval();
    });

    $(document).on('keyup', ".quantity", function() {
        subtotal=0;
        changeval();
    });

});

$(".download").click(function() {
    from=$('.from').val();
    to=$('.to').val();
    invno=$('.invno').val();
    date=$('.date').val();
    duedate=$('.duedate').val();
    payment=$('.payment').text();
    subtotal=$('.currency').text();
    console.log(invno);
    
    var pdf = new jsPDF('p', 'pt', 'letter');
    // source = $('.invoice-item-list')[0];
    pdf.setFontSize(30);
    pdf.text(40, 50, "INVOICE");
    pdf.setFontSize(16);
    pdf.text(40, 100, "From:\n" + from);
    pdf.text(400, 100, "To:\n" + to);
    pdf.text(40, 200, "Invoice No.:" + invno);
    pdf.text(40, 225, "Date: " + date);
    pdf.text(40, 250, "Due Date: " + duedate);
    pdf.text(40, 275, "Payment Mode: " + payment);
    pdf.text(40, 300, "Subtotal Due: " + subtotal);

    //Saving the table
    pdf.setFontSize(24);
    pdf.text(40, 350, "Item\tPrice\tQuantity\tAmount");
    pdf.setFontSize(16);
    var desc=document.querySelectorAll(".invoice-item-code");
    var prices=document.querySelectorAll(".price");
    var quantities=document.querySelectorAll(".quantity");
    var amounts=document.querySelectorAll(".currency-amount");
    if(desc.length===1 && $(desc[0]).val()=="" &&  $(prices[0]).val()=="" && $(quantities[0]).val()=="" && $(amounts[0]).text()=="")
    {
        alert("Please Enter Valid Items");
    }
    else
    {
        for(var i=0;i<desc.length;i++)
        {
            pdf.text(40, 375+(i*25), $(desc[i]).val() + "\t\t" + $(prices[i]).val() + "\t\t" + $(quantities[i]).val() + "\t\t\t\t" + $(amounts[i]).text());
        }
    }
    if(from!=="" && to!=="" && date!=="" && duedate!=="")
    {
        if(duedate>date)
            pdf.save('Test.pdf');
        else
        {
            alert("Due Date cannot be before Issuing Date");
        }
    }
    else
    {
        alert("Address cannot be empty!!");
        console.log(date, duedate, from, to);
        if(duedate>date)
            console.log("true");
    }
});