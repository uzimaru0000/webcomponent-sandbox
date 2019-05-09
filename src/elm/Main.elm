module Main exposing (main)

import Browser exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Encode as JE


type alias Model =
    { email : String
    , password : String
    , isDark : Bool
    }


type Msg
    = InputEmail String
    | InputPassWord String
    | ChangeToggle Bool


main : Program () Model Msg
main =
    Browser.sandbox
        { init = Model "" "" False
        , view = view
        , update = update
        }


view : Model -> Html Msg
view model =
    div
        [ style "border" "5px solid #60B5CC"
        , style "background" <|
            if model.isDark then
                "#333"

            else
                "white"
        , style "color" <|
            if model.isDark then
                "white"

            else
                "black"
        ]
        [ div []
            [ text "This is Elm."
            ]
        , div []
            [ button [ class "button" ]
                [ span [] [ text "ClickMe!" ]
                , ripple [] []
                ]
            ]
        , div []
            [ xInput
                [ placeholder "email"
                , type_ "email"
                , onInput InputEmail
                , varColor <|
                    if model.isDark then
                        "white"

                    else
                        "black"
                , value model.email
                ]
                []
            ]
        , div []
            [ xInput
                [ placeholder "password"
                , type_ "password"
                , onInput InputPassWord
                , varColor <|
                    if model.isDark then
                        "white"

                    else
                        "black"
                , value model.password
                ]
                []
            ]
        , div []
            [ xToggle
                [ onCheck ChangeToggle
                ]
                []
            ]
        , div []
            [ div [] [ text model.email ]
            , div [] [ text model.password ]
            ]
        ]


ripple : List (Attribute msg) -> List (Html msg) -> Html msg
ripple =
    node "ripple-effect"


xInput : List (Attribute msg) -> List (Html msg) -> Html msg
xInput =
    node "x-input"


varColor : String -> Html.Attribute msg
varColor var =
    ("--color:"
        ++ var
    )
        |> JE.string
        |> property "style"


xToggle : List (Attribute msg) -> List (Html msg) -> Html msg
xToggle =
    node "x-toggle"


update : Msg -> Model -> Model
update msg model =
    case msg of
        InputEmail str ->
            { model | email = str }

        InputPassWord str ->
            { model | password = str }

        ChangeToggle val ->
            { model | isDark = val }
