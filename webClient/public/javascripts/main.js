$.ajax({
    method: "GET",
    url: "http://localhost:3010/users",
    headers: {
        authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTUyNTQ2OTUwNX0.k9OXwSu3e1ob3hWZILT50I8-lARzqhOruKK_HBVaIFKWWxHIQZt74PcsY2XCZD8izHhBom925SXyY8OUG5eN0DuPVkiZSGsgbvdVeKd1hfWZYUs0Huo904HGbHEHgaled2kRLitx7_to7psfrOs8dpSdwVHfjzDqTCZQjPcZ-TALy4Sehc_Cj36WxG-5gmmwKCYtlutp6YbtGgTZYV1E3PMeak--wZW2ymbkH7AxAba0b3XSX2k65EXJDon93CTQ1ygPhFahqvq0VFQpjssfYT6rbuR1DPtcfo-Jw3Em-HHrX-6fS6R8N1WllKRcySBCIf8I8vhVdfMvRMJQZmfJqyRMGD3E7lcl0v7_KY-IPSwns3uQMs42yw5II4ILEajLW6hyTJzJTmSpQBBmcO5QPVb1DBhPxvK0OV6rvAADBR82DAFVudsptigKgExz4qVruEeKa3Bfb_cElK9vhiWw1IppTbgYXHTcSNVELkzOuTWaGz_w6V6CqbO00zVngTyn0Xny1sLRHRTL-_YQN28DAUToIaLNFKfbHQ9kPGqpf4pwXGGAygkSalWJwrP5EuRubj5ylcUoJkyZkdRxooOzPL_7WgjXjyKw8k8dXreJW4ztwib1PzZa4EQ35TiMVFPzniXyiifv3f29hnuDHJV0Zgatp1UHsFWi-S81aNVb1Tk",
        accept: "application/json",
        "Content-Type": "application/json"
    }
}).done((data) => {
    console.log(data);
    const userLIs = data.users.map((user) => `<li>${user.email}</li>`);
    $("#user-list").append(userLIs);
})
