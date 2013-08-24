jQuery ->
  $('.logo').on 'click', (e) ->
    e.stopPropagation()
    $('#admin-nav-submenu').toggleClass 'hidden'

  $('html').on 'click', ->
    $('#admin-nav-submenu').addClass 'hidden'
