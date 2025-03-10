function myform(){
    var x=document.getElementById("form1");
    for(var i=0;i<x.length;i++)
    {
        if(x.elements[i].value!='submit')
        {
            console.log(x.elements[i].value);
        }

    }
}