cmake_minimum_required(VERSION 3.5)

project(reacten)


set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

#set(CMAKE_C_FLAGS "--bind -s ENVIRONMENT=web")
#set(CMAKE_CXX_FLAGS "--bind -s ENVIRONMENT=web")


set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ../src)
set(SRC 
    main.cpp
    jsapi.h
    container.h
    canvas.cpp
    components/component.cpp
    components/text.h
    yoga/Yoga.cpp
    yoga/YGNode.cpp
    yoga/YGStyle.cpp
    yoga/YGLayout.cpp
    yoga/YGConfig.cpp
)

add_executable(reacten ${SRC})

set_target_properties(reacten PROPERTIES LINK_FLAGS "--bind -s ENVIRONMENT=web -s ENVIRONMENT_MAY_BE_WORKER=0 -s DISABLE_EXCEPTION_CATCHING=1 -s BINARYEN_TRAP_MODE=clamp -s WASM=1")
