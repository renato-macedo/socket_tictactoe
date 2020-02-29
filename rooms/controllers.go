package rooms

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Error commom interface to error responses
type Error struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

// EndpointHandler  well, handle all requesto to the /rooms endpoint
func EndpointHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println(r.Method)

	switch r.Method {
	case "GET":
		GetRooms(w, r)

	default:
		e := Error{http.StatusBadRequest, "Invalid Method"}
		jsResp, err := json.Marshal(e)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(jsResp)
	}
}

// GetRooms return all active rooms
func GetRooms(w http.ResponseWriter, r *http.Request) {
	fmt.Println("get rooms")
	fmt.Println(Rooms)
	jsResp, err := json.Marshal(Rooms)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsResp)
}
