# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->
  md = 
    update_md_preview: () ->
      content = $('#new-post-body').val()
      console.log content 
      request = $.ajax({
        url: "/render_markdown",
        type: "post",
        data: {
          content: content
        }
      })
      request.done( (data) ->
        console.log data 
        $('#preview-container').html(data)
      )


  window.md = md
