const http_request = require("../helpers/http.request");
const apis = require("../data/api.aircall.metadata");
const data = require("../data/test.data");

// API
const contacts_search_api = apis.contacts.search;

// Test Data
const Contacts_Search_Suite_Data = data.Contacts_Search;
const Search_By_Number_Test_Data = Contacts_Search_Suite_Data.Search_By_Number
const List_All_Test_Data = Contacts_Search_Suite_Data.List_All;


describe("Contacts_Search", () => {

    // Search by Number Check
    test("Search_By_Number : Exact_Number_Prefix_Plus  : check_only_one_contact_is_returned_and_validate_snapshot", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, Search_By_Number_Test_Data.data_provider.exact_number_prefix_plus);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.total);
        expect(contacts_search_list_response.data).toMatchSnapshot();
    });

    test("Search_By_Number : Exact_Number_Prefix_ZERO  : check_only_one_contact_is_returned_and_validate_snapshot", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, Search_By_Number_Test_Data.data_provider.exact_number_prefix_00);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.total);
        expect(contacts_search_list_response.data).toMatchSnapshot();
    });

    test("Search_By_Number : Exact_Number_No_Prefix  : check_only_one_contact_is_returned_and_validate_snapshot", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, Search_By_Number_Test_Data.data_provider.exact_number_no_prefix);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.total);
        expect(contacts_search_list_response.data).toMatchSnapshot();
    });

    test("Search_By_Number : Left_Substring_Number  : check_only_one_contact_is_returned_and_validate_snapshot", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, Search_By_Number_Test_Data.data_provider.left_number_substring);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.total);
        expect(contacts_search_list_response.data).toMatchSnapshot();
    });


    test("Search_By_Number : Right_Substring_Number  : check_no_contact_is_returned_and_validate_snapshot", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, Search_By_Number_Test_Data.data_provider.right_number_substring);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.total);
        expect(contacts_search_list_response.data).toMatchSnapshot();
    });

    // Non Existing Number Check
    test("Search_By_Number : Non_Existing_Number : check_empty_response", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, Search_By_Number_Test_Data.data_provider.non_existing_number);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.total).toBe(0);
        expect(contacts_search_list_response.data).toMatchSnapshot();
    });

    // Pagination behavior Check

    test("List_All : check_results_are_unique_per_page", async () => {
        let contacts_search_list_response_page_1 = await http_request(contacts_search_api, List_All_Test_Data.data_provider.query_page_1);
        let contacts_search_list_response_page_2 = await http_request(contacts_search_api, List_All_Test_Data.data_provider.query_page_2);

        expect(contacts_search_list_response_page_1.status).toBe(contacts_search_list_response_page_2.status).toBe(200);
        expect(contacts_search_list_response_page_1.data.meta.count).toBe(contacts_search_list_response_page_2.data.meta.count).toBe(List_All_Test_Data.data_provider.query_page_1.params.per_page);
        expect(contacts_search_list_response_page_1.data.contacts).not.toIncludeAnyMembers(contacts_search_list_response_page_2.data.contacts)

    });


    test("List_All : check_pagination_default_behavior", async () => {
        let contacts_search_list_response = await http_request(contacts_search_api, List_All_Test_Data.data_provider.default_query);

        expect(contacts_search_list_response.status).toBe(200);
        expect(contacts_search_list_response.data.contacts.length).toBe(contacts_search_list_response.data.meta.count);
        expect(contacts_search_list_response.data.meta).toMatchSnapshot();
    })


    // test("List_All : check_sorting_asc_behavior", async() => {
    //     // expensive test - skipped
    // })

})